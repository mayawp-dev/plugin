/**
 * WordPress dependencies
 */
const { Fragment } = window.wp.element;
const { PanelBody } = window.wp.components;

const ContentTab = () => (
    <Fragment>
        <PanelBody initialOpen={ true }>
            <p>Woohoo</p>
        </PanelBody>
    </Fragment>
)


export default ContentTab;