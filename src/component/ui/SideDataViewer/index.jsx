import React from "react";
import './SideDataViewer.css';

function SideDataViewer({ schema, entity }) {
    if (!schema || !entity) {
        return;
    }

    return (
        <div className="side font__inter--sm">
            <ul>
                {
                    schema.map(section => {
                        return (
                            <li key={section.text} className="side__section">
                                <details>
                                    <summary className="side__title">
                                        {section.text}
                                    </summary>
                                </details>
                                <ul className="side__content">
                                    {section.tabs.map(tab => {
                                        return (
                                            <li key={tab.name} className="side__item">
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
        </div>
    )
}

export default SideDataViewer;