<?php
/**
 * Class MayaWP\API\ActionsHandler
 *
 * @package MayaWP
 */

namespace MayaWP\API;

use MayaWP\API\Controllers\BaseSegment;
use MayaWP\API\Controllers\Content\ContentController;
use MayaWP\API\Controllers\Image\ImageController;

/**
 * Class for handling API actions.
 *
 * @since n.e.x.t
 * @access private
 */
final class ActionsHandler {

	/**
	 * Request data.
	 *
	 * @var array
	 */
	private $request;

	/**
	 * Current action object.
	 *
	 * @var object
	 */
	private $process;

	/**
	 * Current controller object.
	 *
	 * @var object
	 */
	private $controller;

	/**
	 * Constructor.
	 *
	 * @param array $request Array of request data.
	 */
	public function __construct( $request ) {
		$this->request = $request;

		$this->initiate_process();
	}

	/**
	 * Checks whether the current action is registered.
	 *
	 * @return bool
	 */
	public function method_exists() {
		if ( is_subclass_of( $this->process, BaseSegment::class ) ) {
			return $this->process->is_callable( $this->request['method'] );
		}
		return false;
	}

	/**
	 * Assigns segmented process for the required action.
	 *
	 * @return void
	 */
	public function initiate_process() {
		switch ( $this->request['action'] ) {
			case 'image':
				$this->controller = new ImageController( $this->request );
				break;
			case 'content':
			default:
				$this->controller = new ContentController( $this->request );
				break;
		}

		$this->process = $this->controller->get_segment();
	}

	/**
	 * Runs action method.
	 *
	 * @return false[]
	 */
	public function run() {
		if ( is_subclass_of( $this->process, BaseSegment::class ) ) {
			// Trigger an action before callback.
			do_action( "mayawp_pre_{$this->request['action']}_{$this->request['segment']}{$this->request['method']}", $this->process, $this->controller );

			return $this->process->callback( $this->request['method'] );
		}

		return array( 'success' => false );
	}

}
