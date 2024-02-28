import ModalWrapper from "./ModalWrapper";
import style from './style.module.css'

function Modal({ isVisible, onClose, children }) {
    return (
        isVisible &&
        <ModalWrapper>
            <div onClick={onClose} className={style.backdrop}></div>
            <div className={style.modal}>
                {children}
            </div>
        </ModalWrapper>
    )
}

export default Modal