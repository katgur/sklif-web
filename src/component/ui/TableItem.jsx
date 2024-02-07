import React, { useRef, useState } from 'react'
import Popup from './Popup';

const moreIcon = (
    <svg width="4" height="18" viewBox="0 0 6 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.99992 18.6667C4.47268 18.6667 5.66659 19.8606 5.66659 21.3333C5.66659 22.8061 4.47268 24 2.99992 24C1.52716 24 0.333252 22.8061 0.333252 21.3333C0.333252 19.8606 1.52716 18.6667 2.99992 18.6667ZM2.99992 9.33333C4.47268 9.33333 5.66659 10.5272 5.66659 12C5.66659 13.4728 4.47268 14.6667 2.99992 14.6667C1.52716 14.6667 0.333252 13.4728 0.333252 12C0.333252 10.5272 1.52716 9.33333 2.99992 9.33333ZM2.99992 0C4.47268 0 5.66659 1.19391 5.66659 2.66667C5.66659 4.13943 4.47268 5.33333 2.99992 5.33333C1.52716 5.33333 0.333252 4.13943 0.333252 2.66667C0.333252 1.19391 1.52716 0 2.99992 0Z" fill="#64748B" />
    </svg>
)

function TableItem({ item, contextMenu, onClick }) {
    const [targetRect, setTargetRect] = useState(null);

    const onProfileIconClick = (e) => {
        setTargetRect(e.target);
    }

    return (
        <>
            {item.data.map((value) => {
                return (
                    <span key={value} onClick={() => { onClick(item.id) }} className="table-value">{value}</span>
                )
            })}
            {
                contextMenu &&
                <span onClick={onProfileIconClick}>
                    {moreIcon}
                </span>
            }
            <Popup target={targetRect} setTargetRect={setTargetRect} position="left center">
                <ul className="list-context-menu">
                    {contextMenu.map((option, index) => {
                        return (
                            <li key={index}>
                                {option(item.id)}
                            </li>
                        )
                    })}
                </ul>
            </Popup>
        </>
    )
}

export default TableItem;