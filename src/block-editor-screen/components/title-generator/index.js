/**
 * WordPress dependencies.
 */
const { select } = window.wp.data;
const { useState, useEffect } = window.wp.element;
const { TextControl, Button } = window.wp.components;
const { __ } = window.wp.i18n;

/**
 * Internal dependencies.
 */
import Modal from './Modal';

const TitleGenerator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [titleInput, setTitleInput] = useState('');
    const [choices, setChoices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const title = select('core/editor').getEditedPostAttribute( 'title' );
        if ( '' !== title ) {
            setTitleInput(title);
        }
    }, []);

    const handleTitleInput = (event) => {
        setTitleInput(event)
    }

    const handleTitleGenerate = () => {
        setIsOpen(!isOpen);
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className="field-group">
                <label htmlFor="mayawp-app-title" className="title-label">
                    { __( 'Generate Title', 'mayawp' ) }
                </label>

                <TextControl
                    id="mayawp-app-title"
                    value={titleInput}
                    onChange={ handleTitleInput }
                    placeholder='e.g. This post is for the awareness of Global Warming.'
                    help={<>{__(
                        'Generate relative titles to your content with AI or update the input above for any additional input.',
                        'mayawp'
                    )}
                        <br />
                        {__('For e.g. This post is for the awareness of Global Warming.', 'mayawp')}
                    </>}
                    disabled={isLoading}
                />

                <Button
                    variant="primary"
                    onClick={ handleTitleGenerate }
                    disabled={isLoading}
                >
                    Generate
                </Button>

                <Modal isOpen={isOpen} toggleModal={toggleModal} />
            </div>
        </>
    )
}

export default TitleGenerator;