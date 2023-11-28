<?php
/**
 * Image Controller API class.
 *
 * @package MayaWP
 */

namespace MayaWP\API\Controllers\Image;

use MayaWP\API\Controllers\BaseController;
use MayaWP\API\Controllers\Image\Segment\CoreSegment;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class ImageController
 */
class ImageController extends BaseController {
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
