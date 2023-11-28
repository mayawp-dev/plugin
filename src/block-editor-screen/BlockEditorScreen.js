/**
 * WordPress Dependencies.
 */
const { registerPlugin } = window.wp.plugins;
const { PluginSidebar,
    PluginSidebarMoreMenuItem } = window.wp.editPost;
const { Fragment } = window.wp.element;
const { doAction } = window.wp.hooks;
const i18n = window.wp.i18n;

/**
 * Internal Dependencies.
 */
import App from './App';

// @TODO: Add an actual logo.
const AppIcon = () => {
    return (
        <div className="mwp-app-icon">
            <p>MayaWP AI</p>
        </div>
    )
}

export default class BlockEditorScreen {
    setup() {
        doAction( 'mayawp_app_loaded' );

        this.registerSidebar();
    }

    /**
     * Register plugin sidebar into gutenberg editor.
     */
    registerSidebar() {
        const MayaWPSidebar = () => (
            <Fragment>
                <PluginSidebarMoreMenuItem
                    target="mayawp-sidebar"
                    icon={ <AppIcon /> }
                >
                    { i18n.__( 'MayaWP AI', 'mayawp' ) }
                </PluginSidebarMoreMenuItem>
                <PluginSidebar
                    name="mayawp-sidebar"
                    title={ i18n.__( 'MayaWP AI', 'mayawp' ) }
                    className="mayawp-sidebar-panel"
                >
                    <App />
                </PluginSidebar>
            </Fragment>
        )

        registerPlugin( 'mayawp', {
            icon: <AppIcon />,
            render: MayaWPSidebar,
        } )
    }
}