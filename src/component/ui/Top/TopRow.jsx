function TopRow({ data, columns }) {
    return (
        <tr className="top__row">
            {
                columns.map(column => {
                    return (
                        <td key={data[column]}>
                            {data[column]}
                            <div className="top__track" style={{ width: `${data.percent}%` }}></div>
                        </td>)
                })
            }
        </tr>
    )
}

export default TopRow;