<?php
/**
 * Primary class file for the MayaWP.
 *
 * @package MayaWP
 */

namespace MayaWP;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use MayaWP\Admin\RegisterBlockEditorScreen;
use MayaWP\API\LocalAPI;
use MayaWP\Core\Options;
use MayaWP\API\OptionsAPI;
use MayaWP\Blocks\RegisterBlocks;
use MayaWP\Admin\RegisterAdmin;

/**
 * Class Plugin
 */
class Plugin {
	/**
	 * Options manager.
	 *
	 * @var Options
	 */
	public $options_manager;

	/**
	 * Options API manager.
	 *
	 * @var OptionsAPI
	 */
	public $options_api_manager;

	/**
	 * Blocks manager.
	 *
	 * @var RegisterBlocks
	 */
	public $blocks_manager;

	/**
	 * Admin Manager.
	 *
	 * @var RegisterAdmin;
	 */
	public $admin_manager;

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Get options manager instance.
		$this->options_manager = Options::get_instance();

		// Register APIs.
		$this->options_api_manager = new OptionsAPI();
		new LocalAPI();

		// Register Blocks.
		$this->blocks_manager = new RegisterBlocks();

		// Register Admin.
		$this->admin_manager = new RegisterAdmin();

		// Register Block Editor Screen.
		new RegisterBlockEditorScreen();

		$this->register_hooks();
	}

	/**
	 * Registers core hooks.
	 */
	public function register_hooks() {
		/**
		 * Add "Dashboard" link to plugins page.
		 */
		add_filter(
			'plugin_action_links_' . MAYAWP_FOLDER . '/mayawp.php',
			array( $this, 'action_links' )
		);
	}

	/**
	 * Registers plugin action links.
	 *
	 * @param array $actions A list of actions for the plugin.
	 * @return array
	 */
	public function action_links( $actions ) {
		$settings_link = '<a href="' . esc_url( admin_url( 'admin.php?page=mayawp' ) ) . '">' . __( 'Dashboard', 'mayawp' ) . '</a>';
		array_unshift( $actions, $settings_link );

		return $actions;
	}

	/**
	 * Plugin deactivation hook.
	 *
	 * @access public
	 * @static
	 */
	public static function plugin_activation() {
		// Clear the permalinks in case any new post types has been registered.
		flush_rewrite_rules();
	}

	/**
	 * Plugin deactivation hook.
	 *
	 * @access public
	 * @static
	 */
	public static function plugin_deactivation() {
	}
}
