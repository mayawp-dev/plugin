import '../styles/contentTab.css';

/**
 * WordPress dependencies
 */
const { Fragment } = window.wp.element;
const { PanelBody } = window.wp.components;

import TitleGenerator from '../components/title-generator';

const ContentTab = () => {
    return (
        <Fragment>
            <PanelBody initialOpen={ true }>
                <TitleGenerator />
            </PanelBody>
        </Fragment>
    )
}


export default ContentTab;