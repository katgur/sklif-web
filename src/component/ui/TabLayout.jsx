import React from 'react';
import { useState } from "react";

function TabLayout({ titles, children }) {
    const [page, setPage] = useState(0);

    const validation = titles && children && children.length > 0 && titles.length === children.length;
    const onTabClick = (id) => {
        setPage(id);
    }

    return (
        <>
            { validation &&
                <div className="tab-layout">
                    <ul className="card">
                        {titles.map((title, index) => {
                            var className = index === page ? "tab-layout__selected" : "";
                            return (
                                <li className={className} key={title} onClick={() => { onTabClick(index) }}>{title}</li>
                            )
                        })}
                    </ul>
                    <div>{children[page]}</div>
                </div>
            }
        </>
    )
}

export default TabLayout;