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

		if ( ! $force && $options->has( $option_key ) ) {
			$result = $options->get( $option_key );
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
		$options = Options::get_instance();

		$option_key = 'image_generator';
		$force      = $request->get_param( 'forceGenerate' );

		if ( ! $force && $options->has( $option_key ) ) {
			$result = $options->get( $option_key );
			return new WP_REST_Response( $result, 200 );
		}

		$payload = $this->get_request_payload( $request );

		if ( ! isset( $payload['data']['text_input'] ) ) {
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
}
