/**
 * WordPress dependencies.
 */
const { useState } = window.wp.element;
const { Button } = window.wp.components;
const { __ } = window.wp.i18n;

/**
 * Internal dependencies.
 */
import Modal from './Modal';

const TitleGenerator = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <ul className="mwp-app-modal-triggers">
                <li className="mwp-app-modal-trigger-item">
                    <p className="label">
                        { __( 'Generate Title', 'mayawp' ) }
                    </p>
                    <p className="description">
                        { __( 'Let AI create your post/page titles for you. Hit Generate to begin.', 'mayawp' ) }
                    </p>
                    <Button
                        variant="primary"
                        onClick={toggleModal}
                    >
                        { __( 'Open Generator', 'mayawp' ) }
                    </Button>

                    <Modal isOpen={isOpen} toggleModal={toggleModal} />
                </li>
            </ul>
        </>
    )
}

export default TitleGenerator;