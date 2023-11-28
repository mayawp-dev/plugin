/**
 * External Dependencies.
 */
import { Toaster } from 'react-hot-toast';

/**
 * WordPress dependencies.
 */
const { Modal } = window.wp.components;
const { __ } = window.wp.i18n;

const ModalLayout = ({ children, isOpen = false, toggleModal, ...props }) => {

    return (
        <div>
        {isOpen && <Modal
            {...props}
            shouldCloseOnClickOutside={ false }
            closeButtonLabel={ __( 'Close', 'mayawp' ) }
            onRequestClose={ () => {
                document.body.classList.remove( 'modal-open' )
                toggleModal()
            } }
            className="mayawp-app-modal"
            overlayClassName="mayawp-app-modal-overlay"
        >
            <Toaster />

            <div className="mayawp-app-modal-container">
                {children}
            </div>
            </Modal>
            }
        </div>
    )
}

export default ModalLayout;