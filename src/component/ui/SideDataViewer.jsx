import React, { useState } from "react";

function SideDataViewer({ schema, entity }) {
    const [selected, setSelected] = useState(Array(schema.length).fill(false));

    var onTabClick = (index) => {
        var newSelected = [...selected];
        newSelected[index] = !newSelected[index];
        setSelected(newSelected);
    }

    return (
        <div className="drawer1">
            {
                schema.map((s, index) => {
                    return (
                        <li key={s.text}>
                            <span onClick={() => onTabClick(index)}>{s.text}</span>
                            {
                                selected[index] &&
                                <div>
                                    {
                                        s.tabs.map((tab) => {
                                            var value = entity[tab.name];
                                            return (
                                                tab.object ? tab.object(value) :
                                                    (
                                                        value && value.length !== 0 && value[0] &&
                                                        <p key={tab.text}>
                                                            <span className="light-font">{tab.text} </span>
                                                            <span className={tab.style}>{value}</span>
                                                        </p>
                                                    )
                                            )
                                        })
                                    }
                                </div>
                            }
                        </li>
                    )
                })
            }
        </div>
    )
}

export default React.memo(SideDataViewer);