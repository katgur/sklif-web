import ModalWrapper from "./ModalWrapper";
import './Modal.css';

function Modal({ isVisible, onClose, children }) {
    return (
        isVisible &&
        <ModalWrapper>
            <div onClick={onClose} className="modal__backdrop"></div>
            <div className="modal">
                {children}
            </div>
        </ModalWrapper>
    )
}

export default Modal