<?php
/**
 * Content/Core Segment API static class.
 *
 * @package MayaWP
 */

namespace MayaWP\API\Controllers\Content\Segment;

use MayaWP\API\Controllers\BaseSegment;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class CoreSegment
 */
class CoreSegment extends BaseSegment {
	/**
	 * Generate titles.
	 *
	 * @return array
	 */
	public function handle_generate_titles_v1() {

		$args = $this->request['data'] ?? array();

		$payload = array(
			'title_input'   => $args['title_input'] ?? '',
			'content'       => $args['content'] ?? '',
			'meta'          => $args['meta'] ?? '',
			'focus_keyword' => $args['focus_keyword'] ?? '',
		);

		return $this->remote_request( $payload );
	}
}
