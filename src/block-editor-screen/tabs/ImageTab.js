/**
 * WordPress dependencies
 */
const { Fragment } = window.wp.element;
const { PanelBody } = window.wp.components;

/**
 * Internal dependencies.
 */
import ImageGenerator from '../components/image-generator';

const ImageTab = () => (
    <Fragment>
        <PanelBody initialOpen={ true }>
            <ImageGenerator />
        </PanelBody>
    </Fragment>
)


export default ImageTab;