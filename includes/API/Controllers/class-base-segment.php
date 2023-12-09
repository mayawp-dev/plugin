<?php
/**
 * Base Segment Controllers API class.
 *
 * @package MayaWP
 */

namespace MayaWP\API\Controllers;

use MayaWP\Core\Options;
use MayaWP\Utils\HasCallback;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class BaseController
 */
abstract class BaseSegment {
	use HasCallback;

	/**
	 * Remote API URL.
	 *
	 * @var $api_url
	 */
	protected $api_url = MAYAWP_REMOTE_API . '/api';

	/**
	 * Request data.
	 *
	 * @var array
	 */
	protected $request;

	/**
	 * Current segment object.
	 *
	 * @var object
	 */
	protected $segment;

	/**
	 * Constructor
	 *
	 * @param array $request Request data.
	 */
	public function __construct( $request ) {
		$this->request = $request;
	}

	/**
	 * Prepares the route endpoint.
	 *
	 * @return string
	 */
	public function prepare_endpoint() {
		return esc_url( $this->api_url . "/{$this->request['action']}/{$this->request['segment']}/{$this->request['method']}" );
	}

	/**
	 * Make a remote request.
	 *
	 * @param array $payload Request payload data.
	 *
	 * @return array
	 */
	public function remote_request( $payload ) {
		$result = array(
			'success' => false,
		);

		$url = $this->prepare_endpoint();

		if ( ! $url ) {
			$result['error'] = __( 'No URL to request to!', 'mayawp' );
			return $result;
		}

		$options   = Options::get_instance();
		$api_token = esc_html( $options->get( 'api-key' ) );

		if ( empty( $api_token ) ) {
			$result['error'] = __( 'No API key provided!', 'mayawp' );
			return $result;
		}

		$res = wp_remote_post(
			esc_url( $url ),
			array(
				'headers'   => array(
					'Authorization' => "Bearer $api_token",
				),
				'body'      => $payload,
				'sslverify' => false,
			)
		);

		// If response code is anything other than 200 prepare a customized response.
		// If 500 return as an Error.
		$res_code = wp_remote_retrieve_response_code( $res );

		if ( $res_code >= 500 ) {
			$result['error'] = 'Looks like a violation of safety policies. If you think is this is wrong, please contact MayaWP Support.';
			return $result;
		} elseif ( $res_code >= 400 ) {
			switch ( $res_code ) {
				case 426:
					$result['warning'] = 'Not Allowed: Credits are all used up!';
					break;
				case 416:
					$result['warning'] = 'Not Allowed: You don\'t have enough credits!';
					break;
				default:
					$result['warning'] = "Unexpected Failure: Please report back to MayaWP support with the code {$res_code}!";
					break;
			}

			return $result;
		}

		if ( is_wp_error( $res ) ) {
			$result['error'] = $res->get_error_message();
			return $result;
		}

		$data = wp_remote_retrieve_body( $res );

		if ( $res_code < 400 ) {
			$parsed_data = json_decode( $data );

			if ( isset( $parsed_data->output ) ) {
				$result['data']    = $parsed_data->output;
				$result['success'] = true;
			}
		}

		return $result;
	}
}
