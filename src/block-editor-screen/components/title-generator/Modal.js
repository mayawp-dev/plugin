/**
 * WordPress dependencies.
 */
const { select } = window.wp.data;
const { useState, useEffect } = window.wp.element;
const { Modal } = window.wp.components;
const { __ } = window.wp.i18n;

const GeneratorModal = ({ isOpen, toggleModal }) => {
    return <>
        {isOpen && <Modal
            title={ __( 'Title Generator', 'mayawp' ) }
            closeButtonLabel={ __( 'Close', 'mayawp' ) }
            shouldCloseOnClickOutside={ false }
            onRequestClose={ () => {
                document.body.classList.remove( 'modal-open' )
                toggleModal()
            } }
            className="rank-math-modal"
            overlayClassName="rank-math-modal-overlay"
        >
            <>Hello</>
        </Modal>}
    </>
}

export default GeneratorModal;