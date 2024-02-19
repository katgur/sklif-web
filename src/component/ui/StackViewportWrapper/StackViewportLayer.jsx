function StackViewportLayer({ style, children }) {
    return (
        <div className="stack-viewport__layer" style={style}>
            {children}
        </div>
    )
}

export default StackViewportLayer