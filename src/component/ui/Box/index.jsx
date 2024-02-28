import style from './style.module.css'

function Box({ children, align = "center" }) {
    return (
        <div className={`${style.wrapper} ${style[align]}`}>
            {children}
        </div>
    )
}

export default Box;