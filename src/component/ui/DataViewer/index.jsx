import { useState } from 'react';
import { useNavigate } from 'react-router';
import style from './style.module.css'

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
        <div className={`${style.dataViewer} font__inter--sm`}>
            {
                (title || children) &&
                <h2 className='font__inter--m'>{title}{children}</h2>
            }
            <ul className={`${style.tabs} font__jost--xs`}>
                {
                    schema.map((section, index) => {
                        const className = `${style.tab} ${style[index === selected ? "active" : "base"]}`;
                        return (
                            <li className={className} onClick={() => { onTabClick(index) }}>{section.text}</li>
                        )
                    })
                }
            </ul>
            <ul className={`${style.data} font__jost--xs`}>
                {
                    schema[selected].tabs.map((tab) => {
                        const value = entity[tab.name];
                        return (
                            value && value.length !== 0 && value[0] &&
                            <li>
                                <span>{tab.text}&emsp;</span>
                                <span onClick={() => onValueClick(value)} className={style.outlineBadge}>{value}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default DataViewer;