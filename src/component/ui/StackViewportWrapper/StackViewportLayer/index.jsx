import style from './style.module.css'

function StackViewportLayer({ style, children }) {
    return (
        <div className={style.wrapper} style={style}>
            {children}
        </div>
    )
}

export default StackViewportLayer