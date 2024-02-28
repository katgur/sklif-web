import React from "react";
import style from './style.module.css'

function SideDataViewer({ schema, entity, children }) {
    if (!schema || !entity) {
        return;
    }

    return (
        <div className={`${style.wrapper} font__inter--sm`}>
            <ul>
                {
                    schema.map(section => {
                        return (
                            <li key={section.text} className={style.section}>
                                <details>
                                    <summary className={style.title}>
                                        {section.text}
                                    </summary>
                                </details>
                                <ul className={style.content}>
                                    {section.tabs.map(tab => {
                                        return (
                                            <li key={tab.name} className={style.item}>
                                                {`${tab.text}\u00A0\u00A0\u00A0\u00A0${entity[tab.name]}`}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
            {children}
        </div>
    )
}

export default SideDataViewer;