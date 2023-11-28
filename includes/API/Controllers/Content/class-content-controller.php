<?php
/**
 * Content Controller API class.
 *
 * @package MayaWP
 */

namespace MayaWP\API\Controllers\Content;

use MayaWP\API\Controllers\BaseController;
use MayaWP\API\Controllers\Content\Segment\CoreSegment;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class ContentController
 */
class ContentController extends BaseController {
	/**
	 * Instantiate segment instance.
	 *
	 * @return void
	 */
	public function initiate_segment() {
		switch ( $this->request['segment'] ) {
			case 'core':
			default:
				$this->segment = new CoreSegment( $this->request );
				break;
		}
	}
}
