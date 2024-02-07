import { useState, useLayoutEffect } from 'react';
import './Popup.css'
import PopupContent from "./PopupContent";

function PopupWrapper({ targetRect, children, position = 'center bottom' }) {
    const [wrapper, setWrapper] = useState(null);
    const id = "popup";

    console.log(wrapper)
    useLayoutEffect(() => {
        let newWrapper = document.getElementById(id);
        if (newWrapper) {
            newWrapper.parentNode.removeChild(newWrapper);
        }

        newWrapper = document.createElement('div');
        newWrapper.setAttribute('id', id);
        document.body.appendChild(newWrapper);

        setWrapper(newWrapper);

        return () => {
            if (newWrapper.parentNode) {
                newWrapper.parentNode.removeChild(newWrapper);
            }
        }
    }, [])

    return wrapper && <PopupContent wrapper={wrapper} targetRect={targetRect} position={position}>{children}</PopupContent>
}

export default PopupWrapper;