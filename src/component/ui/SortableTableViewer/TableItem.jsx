import React, { useState } from 'react'
import Popup from '../Popup';
import moreIcon from './more.svg';
import style from './style.module.css'

function TableItem({ item, contextMenu, onClick, onDoubleClick }) {
    const [target, setTarget] = useState(null);

    return (
        <>
            {item.data.map((value, index) => {
                return (
                    <span
                        key={index}
                        onClick={() => onClick(item.id)}
                        onDoubleClick={() => onDoubleClick(item.id)}
                        className={`${style.value} ${style.cell}${item.isSelected ? " " + style.selected : ""}`}>
                        {value}
                    </span>
                )
            })}
            {
                contextMenu &&
                <>
                    <span className={`${style.cell}${item.isSelected ? " " + style.selected : ""}`} onClick={(e) => setTarget(target ? null : e.target)}>
                        <img src={moreIcon} alt="more" />
                    </span>
                    <Popup target={target} setTarget={setTarget} position="left bottom">
                        <ul className={`${style.menu} font__inter--sm font_color_text`}>
                            {contextMenu.map((option, index) => {
                                return (
                                    <li key={index} className={style.menuItem}>
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