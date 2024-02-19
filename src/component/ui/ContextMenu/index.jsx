import './ContextMenu.css';
import React from 'react';

function ContextMenu({ children, style = "light" }) {
    return (
        <ul className={`context-menu ${style ? "context-menu--" + style : ""} font__inter--sm font_color_text`}>
            {
                React.Children.map(children, child => <li className='context-menu__item'>{child}</li>)
            }
        </ul>
    )
}

export default ContextMenu