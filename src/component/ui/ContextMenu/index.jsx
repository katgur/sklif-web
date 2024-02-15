import './ContextMenu.css';
import React from 'react';

function ContextMenu({ children }) {
    return (
        <ul className='context-menu font__inter--sm font_color_text'>
            {
                React.Children.map(children, child => <li className='context-menu__item'>{child}</li>)
            }
        </ul>
    )
}

export default ContextMenu