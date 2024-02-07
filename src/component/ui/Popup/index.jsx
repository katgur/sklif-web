import { useEffect } from 'react';
import './Popup.css'
import PopupContent from './PopupContent';

function Popup({ target, setTargetRect, children, position = 'center bottom' }) {
    useEffect(() => {
        const clear = (e) => {
            if (e.target == target) {
                return;
            }
            setTargetRect(null);
        }

        document.body.addEventListener('click', clear);

        return () => {
            document.body.removeEventListener('click', clear);
        }
    }, [target])
    return target && <PopupContent targetRect={target.getBoundingClientRect()} position={position}>{children}</PopupContent>
}

export default Popup;