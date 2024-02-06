import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

function Portal({ children, id }) {
    const [wrapper, setWrapper] = useState(null);

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

    return wrapper && createPortal(children, wrapper);
}

export default Portal