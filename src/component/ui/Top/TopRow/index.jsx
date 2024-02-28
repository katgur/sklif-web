import style from './style.module.css'

function TopRow({ data, columns }) {
    return (
        <tr className={style.row}>
            {
                columns.map(column => {
                    return (
                        <td key={data[column]}>
                            {data[column]}
                            <div className={style.track} style={{ width: `${data.percent}%` }}></div>
                        </td>)
                })
            }
        </tr>
    )
}

export default TopRow;