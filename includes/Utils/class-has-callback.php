<?php
/**
 * Trait MayaWP\Utils\HasCallback
 *
 * @package Stalkfish
 */

namespace MayaWP\Utils;

/**
 * Trait definition for handling callbacks.
 *
 * @since n.e.x.t
 */
trait HasCallback {
	/**
	 * Prepares method for callback.
	 *
	 * @param string $method Method name.
	 *
	 * @return array Callback array.
	 */
	public function get_callback( $method = '' ) {
		return array( $this, 'handle_' . preg_replace( '/[^a-z0-9_\-]/', '_', $method ) );
	}

	/**
	 * Whether method is callable or not.
	 *
	 * @param string $method Method name.
	 *
	 * @return bool Is method callable.
	 */
	public function is_callable( $method ) {
		return is_callable( $this->get_callback( $method ) );
	}

	/**
	 * Looks for a class method with the convention: "handle_{method}"
	 *
	 * @param string $method Method name.
	 * @param array  $method Method name.
	 *
	 * @return void|mixed
	 */
	public function callback( $method, $args = array() ) {
		// Call the real function.
		if ( $this->is_callable( $method ) ) {
			return call_user_func_array( $this->get_callback( $method ), $args );
		}
		return call_user_func( $this->get_callback() );
	}
}
