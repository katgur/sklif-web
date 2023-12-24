import React from 'react';
import { createPortal } from 'react-dom';

/*
state: {
    enabled: bool,
    state.coords: {
        top,
        left,
        right,
        bottom,
    }
}
*/
function Modal({ state, children, className }) {
    const styleString = state.coords ? {top: state.coords.top, left: state.coords.left, right: state.coords.right, bottom: state.coords.bottom} : {};
    const classNameString = className ? "modal " + className : "modal";
    const content = (
        <div className={classNameString} style={styleString}>
            {children}
        </div>
    ) 

    return state.enabled && createPortal(content, document.getElementById('modal'));
}

export default Modal;
