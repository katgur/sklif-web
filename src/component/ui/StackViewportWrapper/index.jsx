import style from './style.module.css'

function StackViewportWrapper({ children }) {
    return (
        <div className={`${style.wrapper} font__inter--xs font_color_white`}>
            {children}
        </div>
    )
}

export default StackViewportWrapper