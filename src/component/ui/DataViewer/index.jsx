import { useState } from 'react';
import { useNavigate } from 'react-router';
import './DataViewer.css';

function DataViewer({ title, entity, schema, path, children }) {
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
        <div className="data-viewer font__inter--sm">
            {
                (title || children) &&
                <h2 className='font__inter--m'>{title}{children}</h2>
            }
            <ul className="data-viewer__tabs font__jost--xs">
                {
                    schema.map((section, index) => {
                        const className = "data-viewer__tab data-viewer__tab--" + (index === selected ? "active" : "base");
                        return (
                            <li className={className} onClick={() => { onTabClick(index) }}>{section.text}</li>
                        )
                    })
                }
            </ul>
            <ul className="data-viewer__data font__jost--xs">
                {
                    schema[selected].tabs.map((tab) => {
                        const value = entity[tab.name];
                        return (
                            value && value.length !== 0 && value[0] &&
                            <li>
                                <span>{tab.text}&emsp;</span>
                                <span onClick={() => onValueClick(value)} className="outline-badge">{value}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default DataViewer;