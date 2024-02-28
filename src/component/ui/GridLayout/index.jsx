import style from './style.module.css'

function GridLayout({ areas, children }) {
    return (
        <div className={style.wrapper} style={{ gridTemplateAreas: areas }}>
            {children}
        </div>
    )
}

export default GridLayout;