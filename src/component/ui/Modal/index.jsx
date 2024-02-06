import Portal from './Portal';

function Modal({ isVisible, children }) {
    return isVisible && <Portal id="modal">{children}</Portal>
}

export default Modal