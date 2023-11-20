<?php
/**
 * Blocks registration class.
 *
 * @package MayaWP
 */

namespace MayaWP\Blocks;

/**
 * Class RegisterBlocks
 */
class RegisterBlocks {
	/**
	 * Class constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'blocks' ) );
	}

	/**
	 * Register blocks and scripts.
	 */
	public function blocks() {
		$blocks = array(
			'demo-block',
		);

		foreach ( $blocks as $block ) {
			register_block_type( MAYAWP_DIR . "/build/blocks/{$block}" );
		}

		add_action( 'admin_enqueue_scripts', array( $this, 'block_scripts' ) );
	}

	/**
	 * Register block scripts and styles.
	 */
	public function block_scripts() {
		/**
		 * Note that in the block json the block name is "mayawp/demo-block" though you also need to add a suffix
		 * of editor-script to make it work at block editor.
		 */
		$handle = 'mayawp-demo-block-editor-script';

		$data = get_transient( 'mayawp-demo-block-data' );

		if ( ! $data ) {
			$response = wp_remote_get( 'https://jsonplaceholder.typicode.com/users' );
			$data     = wp_remote_retrieve_body( $response );
			$data     = json_decode( $data );

			set_transient( 'mayawp-demo-block-data', $data, 7 * DAY_IN_SECONDS );
		}

		wp_localize_script( $handle, 'mayawpDemoBlockData', $data );
	}
}
