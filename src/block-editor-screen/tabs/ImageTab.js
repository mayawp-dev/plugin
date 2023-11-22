/**
 * WordPress dependencies
 */
const { Fragment } = window.wp.element;
const { PanelBody } = window.wp.components;

const ImageTab = () => (
    <Fragment>
        <PanelBody initialOpen={ true }>
            <p>Image yayy</p>
        </PanelBody>
    </Fragment>
)


export default ImageTab;