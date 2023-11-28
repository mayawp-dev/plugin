<?php
/**
 * Base Controllers API class.
 *
 * @package MayaWP
 */

namespace MayaWP\API\Controllers;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class BaseController
 */
abstract class BaseController {

	/**
	 * Request data.
	 *
	 * @var array
	 */
	protected $request;

	/**
	 * Current segment object.
	 *
	 * @var BaseSegment
	 */
	protected $segment;

	/**
	 * Constructor
	 *
	 * @param array $request Request data.
	 */
	public function __construct( $request ) {
		$this->request = $request;

		$this->initiate_segment();
	}

	/**
	 * Implements segment instance instantiator.
	 *
	 * @return object
	 */
	abstract public function initiate_segment();

	/**
	 * Gets segment process for the required action.
	 *
	 * @return BaseSegment
	 */
	public function get_segment() {
		return $this->segment;
	}
}
