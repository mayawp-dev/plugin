/**
 * WordPress dependencies
 */
const { __ } = window.wp.i18n;
const { createElement, Fragment } = window.wp.element;
const { applyFilters } = window.wp.hooks;

/**
 * Internal dependencies
 */
import TabPanel from './components/TabPanel';
import ContentTab from './tabs/ContentTab';
import ImageTab from './tabs/ImageTab';

const getTabs = () => {
    const tabs = [
        {
            name: 'content',
            title: (
                <Fragment>
                    <span>{ __( 'Content', 'mayawp' ) }</span>
                </Fragment>
            ),
            view: ContentTab,
            className: 'mayawp-content-tab',
        },
        {
            name: 'image',
            title: (
                <Fragment>
                    <span>{ __( 'Image', 'mayawp' ) }</span>
                </Fragment>
            ),
            view: ImageTab,
            className: 'mayawp-image-tab',
        }
    ]

    // Switch to conditional activations with user permissions data from app.
    // tabs.push( { // tab-object} );

    return applyFilters( 'mayawp_app_tabs', tabs );
}


const App = () => {
    return <TabPanel
        className="mayawp-app-tabs"
        activeClass="is-active"
        tabs={ getTabs() }
    >
        { ( tab ) => (
            <div className={ 'mayawp-app-tab-' + tab.name }>
                { createElement( tab.view ) }
            </div>
        ) }
    </TabPanel>
}

export default App;