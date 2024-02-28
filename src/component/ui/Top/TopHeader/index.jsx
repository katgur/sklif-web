import style from './style.module.css'

function TopHeader({ columns }) {
    return (
        <tr className={`font_color_text ${style.header}`}>
            {
                columns.map(column => <th key={column}>{column}</th>)
            }
        </tr>
    )
}

export default TopHeader;