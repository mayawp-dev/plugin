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
	}


	/**
	 * Defines REST Routes.
	 *
	 * @return void
	 */
	public function define_routes() {
		$this->routes = array(
			'get_titles' => array(
				'method'   => WP_REST_Server::READABLE,
				'callback' => 'generate_titles',
			),
		);
	}

	/**
	 * Registers v1 REST routes.
	 *
	 * @return void
	 */
	public function register_v1_routes() {
		foreach ( $this->routes as $route => $details ) {
			register_rest_route(
				"{$this->namespace}/v1",
				"/local/{$route}",
				array(
					'methods'             => $details['method'],
					'callback'            => array( $this, $details['callback'] ),
					'permission_callback' => array( $this, 'rest_permission_check' ),
					'args'                => array(),
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
	 * Generate titles.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_Error|WP_REST_Response
	 */
	public function generate_titles( WP_REST_Request $request ) {
		$options = Options::get_instance();

		$option_key = 'generated_titles';
		$force      = $request->get_param( 'forceGenerate' );

		$result = array();

		if ( ! $force && $options->has( $option_key ) ) {
			$result['titles'] = $options->get( $option_key );
			return new WP_REST_Response( $result, 200 );
		}

		$title_input = $request->get_param( 'titleInput' );
		$content     = $request->get_param( 'content' );

		if ( ! $title_input && ! $content ) {
			return new WP_Error( 'input_error', __( 'No input provided.', 'mayawp' ) );
		}

		// Generate titles via RemoteAPI here.

		return new WP_REST_Response( $result, 200 );
	}
}
