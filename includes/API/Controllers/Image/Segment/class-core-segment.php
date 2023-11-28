<?php
/**
 * Image/Core Segment API static class.
 *
 * @package MayaWP
 */

namespace MayaWP\API\Controllers\Image\Segment;

use MayaWP\API\Controllers\BaseSegment;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class CoreSegment
 */
class CoreSegment extends BaseSegment {
	/**
	 * Generate imag.
	 *
	 * @return array
	 */
	public function handle_generate_image_v1() {

		$args = $this->request['data'] ?? array();

		$payload = array(
			'text_input' => $args['text_input'] ?? '',
		);

		return $this->remote_request( $payload );
	}
}
