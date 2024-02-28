import style from './style.module.css'

function Scroll({ total, current }) {

    var marginLeft = Math.round(current / total * 100);
    var width = Math.round((1 / total * 100));

    return (
        <div className={style.track}>
            <div className={style.scroll} style={{ marginLeft: `${marginLeft}%`, width: `${width}%` }}></div>
        </div>
    )
}

export default Scroll;