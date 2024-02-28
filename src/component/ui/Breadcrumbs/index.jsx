import style from './style.module.css'

function Breadcrumbs({ title, children }) {
    return (
        <nav className={style.breadcrumbs}>
            <h2 className='font__inter--xl'>
                {title}
            </h2>
            <ul className='font__inter--sm'>
                {
                    children.map && children.map((child, index) => {
                        return (
                            <li key={index}>
                                <span className={`${style.link}${(index === children.length - 1 ? " " + style.active : "")}`}>
                                    {child}
                                </span>
                                {index < children.length - 1 && <span>{`\u00A0\u00A0/\u00A0\u00A0`}</span>}
                            </li>
                        )
                    })
                }
                {
                    !children.map &&
                    <li>
                        <span className={`${style.link} ${style.active}`}>
                            {children}
                        </span>
                    </li>
                }
            </ul>
        </nav >
    )
}

export default Breadcrumbs