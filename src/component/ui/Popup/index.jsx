import './Popup.css'
import PopupWrapper from './PopupWrapper';

function Popup({ targetRect, children, position = 'center bottom' }) {
    return targetRect && <PopupWrapper targetRect={targetRect} position={position}>{children}</PopupWrapper>
}

export default Popup;