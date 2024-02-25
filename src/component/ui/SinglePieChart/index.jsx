import style from './SinglePieChart.module.css';

function SinglePieChart({ title, value, percent, color, children }) {
    return (
        <div className={`${style.wrapper} font_color_${color}`}>
            <span className={style.icon}>
                {children}
            </span>
            <div className={style.content}>
                <p className={style.text}>
                    <span className="font__jost--sm font_color_black">
                        {title}
                    </span>
                    <span className="font__jost--xs font_color_text">
                        {value}
                    </span>
                </p>
                <div className={style.track}>
                    <div className={style.thumb} style={{ width: `${percent}%`, color: "currentColor" }}></div>
                </div>
            </div>
        </div>
    )
}

export default SinglePieChart;