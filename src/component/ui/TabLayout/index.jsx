import React from 'react';
import { useState } from "react";
import style from './style.module.css'

function TabLayout({ titles, children }) {
    const [page, setPage] = useState(0);

    const validation = titles && children && children.length > 0 && titles.length === children.length;

    return (validation &&
        <div className={`${style.wrapper} font__inter--sm`}>
            <div className={style.content}>
                {children[page]}
            </div>
            <ul className={style.tabs}>
                {titles.map((title, index) => {
                    const style1 = style.tab + (page === index ? " " + style.selected : "");
                    return (
                        <li className={style1} key={title} onClick={() => setPage(index)}>{title}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default TabLayout;