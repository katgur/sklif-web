import style from './GridLayout.module.css';

function GridLayout({ areas, children }) {
    console.log(areas)
    return (
        <div className={style.wrapper} style={{ gridTemplateAreas: areas }}>
            {children}
        </div>
    )
}

export default GridLayout;