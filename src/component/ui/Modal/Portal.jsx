import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import PortalContent from "./PortalContent";

function Portal({ children, id }) {
    const [wrapper, setWrapper] = useState(null);

    console.log(wrapper);
    
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

    return wrapper && <PortalContent wrapper={wrapper}>{children}</PortalContent>
}

export default Portal