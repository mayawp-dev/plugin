<?php
/**
 * Options API registration class.
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
 * Class OptionsAPI
 */
class OptionsAPI {
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
			'get'    => array(
				'method'   => WP_REST_Server::READABLE,
				'callback' => 'get_option',
			),
			'set'    => array(
				'method'   => WP_REST_Server::CREATABLE,
				'callback' => 'set_option',
			),
			'delete' => array(
				'method'   => WP_REST_Server::CREATABLE,
				'callback' => 'delete_option',
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
				"/options/{$route}",
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
	 * Get option or options.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_option( WP_REST_Request $request ) {
		$key = $request->get_param( 'key' );

		$options = Options::get_instance();

		if ( ! empty( $key ) ) {
			if ( $options->has( $key ) ) {
				$result = $options->get( $key );
			} else {
				return new WP_Error( 'option_error', __( 'Invalid or expired option name.', 'mayawp' ) );
			}
		} else {
			$result = $options->get();
		}

		return new WP_REST_Response( $result, 200 );
	}

	/**
	 * Set option or options.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_Error|WP_REST_Response
	 */
	public function set_option( WP_REST_Request $request ) {
		$settings = $request->get_param( 'options' );

		$options = Options::get_instance();

		if ( ! empty( $settings ) && is_array( $settings ) ) {
			foreach ( $settings as $key => $value ) {
				$options->set( $key, $value );
			}
		} else {
			return new WP_Error( 'settings_error', __( 'No settings provided.', 'mayawp' ) );
		}

		return new WP_REST_Response(
			array(
				'message' => __( 'Settings updated.', 'mayawp' ),
			),
			200
		);
	}

	/**
	 * Delete option
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_Error|WP_REST_Response
	 */
	public function delete_option( WP_REST_Request $request ) {
		$key = $request->get_param( 'key' );

		$options = Options::get_instance();

		if ( ! empty( $key ) ) {
			if ( $options->has( $key ) ) {
				$options->delete( $key );
			} else {
				return new WP_Error( 'option_error', __( 'Invalid or expired option name.', 'mayawp' ) );
			}
		} else {
			return new WP_Error( 'option_error', __( 'No option key is provided.', 'mayawp' ) );
		}

		return new WP_REST_Response(
			array(
				'message' => __( 'Setting deleted.', 'mayawp' ),
			),
			200
		);
	}
}
