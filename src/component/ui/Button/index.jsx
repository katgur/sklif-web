import './Button.css';

function Button({ type, style, children }) {
    return (
        <button type={type} className={`button button_theme_${style} font__medium-16 font_color_${style === "primary" ? "gray" : "primary"}`}>{children}</button>
    )
}

export default Button;