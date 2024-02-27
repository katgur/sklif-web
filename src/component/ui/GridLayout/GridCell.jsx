function GridCell({ area, children }) {
    return (
        <div style={{ gridArea: area, height: "100%" }}>
            {children}
        </div>
    )
}

export default GridCell;