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
const AppIcon = ({ withText = false }) => {
    return (
        <div className="mwp-app-icon" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
        }}>
            <span style={{
                lineHeight: 1,
            }}>
                <svg className="logo" width="476" height="459" viewBox="0 0 476 459" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                    height: 'auto',
                    width: '13px',
                }}>
                    <path d="M196.504 312.519L78.1611 407.831L0 304.602L129.679 220.139L14.4265 113.669L106.916 27.2618L209.415 130.16L297.83 0L396.66 65.2587L330.956 170.636L476 181.611L466.665 305.155L321.621 294.181L370.059 417.318L258.386 458.83L196.504 312.519Z" fill="inherit"/>
                </svg>
            </span>
            {withText && <span style={{ fontSize: '13px', lineHeight: 1 }}>MayaWP AI</span>}
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
            icon: <AppIcon withText={true} />,
            render: MayaWPSidebar,
        } )
    }
}