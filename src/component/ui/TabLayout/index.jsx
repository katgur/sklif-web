import React from 'react';
import { useState } from "react";
import './TabLayout.css';

function TabLayout({ titles, children }) {
    const [page, setPage] = useState(0);

    const validation = titles && children && children.length > 0 && titles.length === children.length;

    return (validation &&
        <div className="tab-layout">
            <div className="tab-layout__content">
                {children[page]}
            </div>
            <ul className="card tab-layout__tabs">
                {titles.map((title, index) => {
                    const style = "tab-layout__tab" + (page === index ? " tab-layout__tab--selected" : "");
                    return (
                        <li className={style} key={title} onClick={() => setPage(index)}>{title}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default TabLayout;