<?php
/**
 * Local API registration class.
 *
 * @package MayaWP
 */

namespace MayaWP\API;

use MayaWP\Core\Options;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class LocalAPI
 */
class LocalAPI {
	/**
	 * Routes Namespace.
	 *
	 * @var $namespace
	 */
	private $namespace = MAYAWP_SLUG;

	/**
	 * Available routes.
	 *
	 * @var $endpoints
	 */
	private $routes;

	/**
	 * Class constructor.
	 */
	public function __construct() {
		// Define routes.
		$this->define_routes();

		// Register v1 routes.
		add_action( 'rest_api_init', array( $this, 'register_v1_routes' ) );

		// Modify HTTP request timeout for CURL.
		add_filter( 'http_request_timeout', array( $this, 'modify_request_timeout' ) );
	}


	/**
	 * Defines REST Routes.
	 *
	 * @return void
	 */
	public function define_routes() {
		$this->routes = array(
			'get_titles' => WP_REST_Server::CREATABLE,
			'get_image'  => WP_REST_Server::CREATABLE,
			'save_image' => WP_REST_Server::CREATABLE,
		);
	}

	/**
	 * Registers v1 REST routes.
	 *
	 * @return void
	 */
	public function register_v1_routes() {
		foreach ( $this->routes as $route => $method ) {
			register_rest_route(
				"{$this->namespace}/v1",
				"/local/{$route}",
				array(
					'methods'             => $method,
					'callback'            => array( $this, $route ),
					'permission_callback' => array( $this, 'rest_permission_check' ),
				)
			);
		}
	}

	/**
	 * Checks if a request has access to update a setting
	 *
	 * @return WP_Error|bool
	 */
	public function rest_permission_check() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Modify HTTP request timeout limit.
	 *
	 * @param int $timeout
	 *
	 * @return int
	 */
	public function modify_request_timeout( $timeout ) {
		$required_timeout = 120;

		if ( $required_timeout > $timeout ) {
			return $required_timeout;
		}

		return $timeout;
	}

	/**
	 * Run requested controller and process actions.
	 *
	 * @param array $request Request payload.
	 *
	 * @return array
	 */
	public function process_actions_handler( $request ) {
		// New way of handling requests.
		$handler = new ActionsHandler( $request );

		// Is there actually a method for this API request? If not trigger 400 - Bad request.
		status_header( $handler->method_exists() ? 200 : 400 );

		// Call the method fulfill the request.
		return $handler->run();
	}

	/**
	 * Request payload for Controller API usage.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @param array           $data Additional data.
	 *
	 * @return array
	 */
	private function get_request_payload( WP_REST_Request $request, array $data = array() ) {
		$params = array(
			'action'  => $request->get_param( 'action' ) ?? '',
			'segment' => $request->get_param( 'segment' ) ?? '',
			'method'  => $request->get_param( 'method' ) ?? '',
			'data'    => $request->get_param( 'data' ) ?? array(),
		);

		// Read through secondary data for additional data.
		if ( count( $data ) ) {
			foreach ( $data as $key => $value ) {
				$params['data'][ $key ] = $value;
			}
		}

		return $params;
	}

	/**
	 * Generate titles.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_titles( WP_REST_Request $request ) {
		$options = Options::get_instance();

		$option_key = 'title_generator';
		$force      = $request->get_param( 'forceGenerate' );

		if ( ! $force ) {
			if ( $options->has( $option_key ) ) {
				$result = $options->get( $option_key );
			} else {
				$result = array(
					'success' => false,
				);
			}
			return new WP_REST_Response( $result, 200 );
		}

		$payload = $this->get_request_payload( $request );

		if ( ! isset( $payload['data']['title_input'] ) && ! isset( $payload['data']['content'] ) ) {
			return new WP_Error( 'input_error', __( 'No input provided.', 'mayawp' ) );
		}

		$res = $this->process_actions_handler( $payload );

		$result = $res;

		// Save for future responses if not regenerated.
		if ( isset( $res['success'] ) && isset( $res['data'] ) && $res['success'] ) {
			$options->set( $option_key, $res );
		}

		return new WP_REST_Response( $result, 200 );
	}

	/**
	 * Generate image.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_image( WP_REST_Request $request ) {
		$transient_key = 'mayawp_image_generator';
		$force         = $request->get_param( 'forceGenerate' );
		$data          = get_transient( $transient_key );

		if ( ! $force ) {
			if ( empty( $data ) ) {
				$data = array();
			}

			return new WP_REST_Response( $data, 200 );
		}

		$payload = $this->get_request_payload( $request );

		if ( ! isset( $payload['data']['text_input'] ) ) {
			return new WP_Error( 'input_error', __( 'No input provided.', 'mayawp' ) );
		}

		$res = $this->process_actions_handler( $payload );

		$result = $res;

		// Save for future responses if not regenerated.
		if ( isset( $res['success'] ) && isset( $res['data'] ) && false !== $res['success'] ) {
			// Store transient for 6 hours.
			set_transient( $transient_key, $res, 7 * DAY_IN_SECONDS );
		}

		return new WP_REST_Response( $result, 200 );
	}

	/**
	 * Save image.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_Error|WP_REST_Response
	 */
	public function save_image( WP_REST_Request $request ) {
		$image_b64 = $request->get_param( 'imageJSON' ) ?? '';

		if ( empty( $image_b64 ) ) {
			return new WP_Error( 'input_error', __( 'No input image URL provided.', 'mayawp' ) );
		}

		$upload_dir  = wp_upload_dir();
		$upload_path = str_replace( '/', DIRECTORY_SEPARATOR, $upload_dir['path'] ) . DIRECTORY_SEPARATOR;

		$img             = str_replace( ' ', '+', $image_b64 );
		$decoded         = base64_decode( $img ); // phpcs:ignore
		$filename        = 'mayawp-ai-generated.png';
		$file_type       = 'image/png';
		$hashed_filename = md5( $filename . microtime() ) . '_' . $filename;

		global $wp_filesystem;

		if ( empty( $wp_filesystem ) ) {
			require_once ABSPATH . '/wp-admin/includes/file.php';
			WP_Filesystem();
		}

		// Save the image in the uploads directory.
		$upload_file = $wp_filesystem->put_contents( $upload_path . $hashed_filename, $decoded );

		if ( ! $upload_file ) {
			return new WP_Error( 'upload_error', __( 'Failed to write into uploads.', 'mayawp' ) );
		}

		$attachment = array(
			'post_mime_type' => $file_type,
			'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $hashed_filename ) ),
			'post_content'   => '',
			'post_status'    => 'inherit',
			'guid'           => $upload_dir['url'] . '/' . basename( $hashed_filename ),
		);

		// It is time to add our uploaded image into WordPress media library.
		$attachment_id = wp_insert_attachment(
			$attachment,
			$upload_dir['path'] . '/' . $hashed_filename
		);

		if ( is_wp_error( $attachment_id ) || ! $attachment_id ) {
			return new WP_Error( 'attachment_error', __( 'An error occurred while saving to gallery, please try again.', 'mayawp' ) );
		}

		if ( ! function_exists( 'wp_update_attachment_metadata' ) || ! function_exists( 'wp_generate_attachment_metadata' ) ) {
			// Update metadata, regenerate image sizes.
			require_once ABSPATH . 'wp-admin/includes/image.php';
		}

		$attach_data = wp_generate_attachment_metadata( $attachment_id, $upload_dir['path'] . '/' . $hashed_filename );
		wp_update_attachment_metadata( $attachment_id, $attach_data );

		return new WP_REST_Response(
			array(
				'success' => true,
			),
			200
		);
	}
}
