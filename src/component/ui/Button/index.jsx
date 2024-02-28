import _style from './style.module.css'

function Button({ type = "button", style = "primary", children, onClick }) {
    return (
        <button onClick={onClick} type={type}
            className={`${_style.button} ${_style[style]} font__inter--sm`}>{children}</button>
    )
}

export default Button;