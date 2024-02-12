import './Button.css';

function Button({ type, style, children, onClick }) {
    return (
        <button onClick={onClick} type={type} className={`button button_theme_${style} font__inter--sm font_color_${style === "primary" ? "gray" : "primary"}`}>{children}</button>
    )
}

export default Button;