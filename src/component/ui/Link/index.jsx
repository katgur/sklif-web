import './Link.css';

function Link({ children, style }) {
    return (
        <div className={`link link_theme_${style} font__inter--sm font_color_${style === "primary" ? "gray" : "primary"}`}>
            {children}
        </div>
    )
}

export default Link