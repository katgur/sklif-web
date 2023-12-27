import { useMemo } from 'react'
import { createPortal } from 'react-dom'


function Modal({ isVisible, children }) {
    const container = useMemo(
        () => document.getElementById('modal'),
        []
    )
    return container && isVisible && createPortal(children, container)
}

export default Modal