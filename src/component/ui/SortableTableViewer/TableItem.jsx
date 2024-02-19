import React, { useRef, useState } from 'react'
import Popup from '../Popup';
import moreIcon from './more.svg';

function TableItem({ item, contextMenu, onClick, onDoubleClick }) {
    const [target, setTarget] = useState(null);

    return (
        <>
            {item.data.map((value) => {
                return (
                    <span
                        key={value}
                        onClick={() => onClick(item.id)}
                        onDoubleClick={() => onDoubleClick(item.id)}
                        className={`table-viewer__value table-viewer__cell${item.isSelected ? " table-viewer__cell--selected" : ""}`}>
                        {value}
                    </span>
                )
            })}
            {
                contextMenu &&
                <>
                    <span className={`table-viewer__cell${item.isSelected ? " table-viewer__cell--selected" : ""}`} onClick={(e) => setTarget(target ? null : e.target)}>
                        <img src={moreIcon} alt="more" />
                    </span>
                    <Popup target={target} setTarget={setTarget} position="left bottom">
                        <ul className="table-viewer__menu font__inter--sm font_color_text">
                            {contextMenu.map((option, index) => {
                                return (
                                    <li key={index} className="table-viewer__menu-item">
                                        {option(item.id)}
                                    </li>
                                )
                            })}
                        </ul>
                    </Popup>
                </>
            }
        </>
    )
}

export default TableItem;