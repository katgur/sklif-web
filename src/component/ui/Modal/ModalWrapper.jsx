import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

function ModalWrapper({ children }) {
    const [wrapper, setWrapper] = useState(null);

    useEffect(() => {
        let newWrapper = document.getElementById('modal');
        if (!newWrapper) {
            newWrapper = document.createElement('div');
            newWrapper.setAttribute('id', 'modal');
            document.body.appendChild(newWrapper);
        }
        setWrapper(newWrapper);

        return () => {
            if (newWrapper.parentNode) {
                newWrapper.parentNode.removeChild(newWrapper);
            }
        }
    }, [])

    return wrapper && createPortal(children, wrapper);
}

export default ModalWrapper