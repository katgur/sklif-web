import style from './SinglePieChart.module.css';
import MediaIcon from './media.svg?react';
import DocsIcon from './docs.svg?react';

const icons = {
    media: <MediaIcon />,
    docs: <DocsIcon />
}

function SinglePieChart({ title, value, percent, color }) {
    console.log(title, icons[title])
    return (
        <div className={`${style.wrapper} font_color_${color}`}>
            <span className={style.icon}>
                {icons[title]}
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