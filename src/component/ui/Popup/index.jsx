import './Popup.css'
import PopupContent from "./PopupContent";

function Popup({ targetRect, children, position = 'center bottom' }) {
    return targetRect && <PopupContent targetRect={targetRect} position={position}>{children}</PopupContent>
}

export default Popup;