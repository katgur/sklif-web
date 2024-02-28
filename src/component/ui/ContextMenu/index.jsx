import _style from './style.module.css'
import React from 'react';

function ContextMenu({ children, style = "light" }) {
    return (
        <ul className={`${style.contextMen} ${_style[style]} font__inter--sm font_color_text`}>
            {
                React.Children.map(children, child => <li className={style.item}>{child}</li>)
            }
        </ul>
    )
}

export default ContextMenu