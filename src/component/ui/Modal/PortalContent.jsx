import { createPortal } from "react-dom"

function PortalContent({ children, wrapper }) {
    console.log(wrapper);
    return createPortal(children, wrapper);
}

export default PortalContent