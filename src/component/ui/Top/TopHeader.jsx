function TopHeader({ columns }) {
    return (
        <tr className="font_color_text top__header">
            {
                columns.map(column => <th key={column}>{column}</th>)
            }
        </tr>
    )
}

export default TopHeader;