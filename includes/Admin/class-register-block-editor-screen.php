<?php
/**
 * Admin Block Editor Screen class.
 *
 * @package MayaWP
 */

namespace MayaWP\Admin;

use Automattic\Jetpack\Assets;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Class RegisterBlockEditorScreen
 */
class RegisterBlockEditorScreen
{
    /**
     * Class constructor.
     */
    public function __construct()
    {
        // Register App at Editor Screen.
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
    }

    /**
     * Enqueues app scripts.
     *
     * @return void
     */
    public function enqueue() {
        $is_block_editor = self::is_block_editor();
        $prefix = MAYAWP_SLUG;

        Assets::register_script(
            $prefix . '-block-editor-app',
            'build/block-editor-screen/index.js',
            MAYAWP_ROOT_FILE,
            array(
                'in_footer'  => true,
                'textdomain' => 'mayawp',
                'dependencies' => [
                    'clipboard',
                    'wp-autop',
                    'wp-blocks',
                    'wp-api-fetch',
                    'wp-components',
                    'wp-editor',
                    'wp-edit-post',
                    'wp-element',
                    'wp-i18n',
                    'wp-plugins',
                    'wp-wordcount',
                    'lodash'
                ],
            )
        );

        // Block editor scripts.
        if ( $is_block_editor ) {
            // Enqueue app script.
            Assets::enqueue_script( $prefix . '-block-editor-app' );

            // Initial JS state.
            wp_add_inline_script( $prefix . '-block-editor-app', $this->render_editor_app_initial_state(), 'before' );
        }
    }

    /**
     * Render the initial state into a JavaScript variable.
     *
     * @return string
     */
    public function render_editor_app_initial_state() {
        return 'var mayawpAppState=JSON.parse(decodeURIComponent("' . rawurlencode( wp_json_encode( $this->initial_app_state() ) ) . '"));';
    }

    /**
     * Get the initial state data for hydrating the React UI.
     *
     * @return array
     */
    public function initial_app_state() {
        return array(
            'apiRoute'     => MAYAWP_SLUG . '/v1',
            'assetsURL'    => MAYAWP_URL . '/assets',
            'version'      => MAYAWP_VERSION,
        );
    }

    /**
     * Checks if the current is screen is of Block Editor.
     *
     * @return bool
     */
    public static function is_block_editor() {
        // Check WordPress version.
        if ( version_compare( get_bloginfo( 'version' ), '5.0.0', '<' ) ) {
            return false;
        }

        $screen = function_exists( 'get_current_screen' ) ? get_current_screen() : false;

        if ( ! $screen instanceof \WP_Screen ) {
            return false;
        }

        if ( method_exists( $screen, 'is_block_editor' ) ) {
            return $screen->is_block_editor();
        }

        if ( 'post' === $screen->base ) {
            return self::use_block_editor_for_post_type( $screen->post_type );
        }

        return false;
    }

    /**
     * Return whether a post type is compatible with the block editor.
     *
     * @param string $post_type The post type.
     *
     * @return bool Whether the post type can be edited with the block editor.
     */
    public static function use_block_editor_for_post_type( $post_type ) {
        if ( ! post_type_exists( $post_type ) ) {
            return false;
        }

        if ( ! post_type_supports( $post_type, 'editor' ) ) {
            return false;
        }

        $post_type_object = get_post_type_object( $post_type );

        if ( $post_type_object && ! $post_type_object->show_in_rest ) {
            return false;
        }

        /**
         * Filter whether a post is able to be edited in the block editor.
         *
         * @since 5.0.0
         *
         * @param bool   $use_block_editor  Whether the post type can be edited or not. Default true.
         * @param string $post_type         The post type being checked.
         */
        return apply_filters( 'use_block_editor_for_post_type', true, $post_type );
    }

}