import './StackViewport.css';

function StackViewportWrapper({ children }) {
    return (
        <div className="stack-viewport font__inter--xs font_color_white">
            {children}
        </div>
    )
}

export default StackViewportWrapper