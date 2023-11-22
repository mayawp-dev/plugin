/**
 * External dependencies.
 */
const $ = window.jQuery;

/**
 * Internal dependencies.
 */
import BlockEditorScreen from "./BlockEditorScreen";

import './styles/index.css';


/**
 * Initial render function.
 */
$( document ).ready( function() {
    window.mayawpEditor = new BlockEditorScreen();
    window.mayawpEditor.setup();
} );