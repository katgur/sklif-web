import { useState, memo } from 'react';
import { useNavigate } from 'react-router';

function DataViewer({ name, entity, schema, path }) {
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();

    const onTabClick = (index) => {
        setSelected(index);
    }

    const onValueClick = (value) => {
        if (path) {
            navigate(`/home/${path}/search/${value}`);
        }
    }

    return (
        <div className="data-viewer">
            <h4>{name}</h4>
            <p className="tabs">
                {
                    schema.map((section, index) => {
                        var className = index === selected ? "tab-selected" : "tab";
                        return (
                            <span className={className} onClick={() => { onTabClick(index) }}>{section.text}</span>
                        )
                    })
                }
            </p>
            <div className="data">
                {
                    schema[selected].tabs.map((tab) => {
                        var value = entity[tab.name];
                        return (
                            value && value.length !== 0 && value[0] &&
                            <p>
                                <span className="title-font">{tab.text} </span>
                                <span onClick={() => onValueClick(value)} className="outline-badge searchable">{value}</span>
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default memo(DataViewer);