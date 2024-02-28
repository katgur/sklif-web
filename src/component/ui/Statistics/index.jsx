import style from './style.module.css'

function Statistics({ data }) {
    return (
        <div className={style.wrapper}>
            {
                data.map(stat => (
                    <div className={style.item}>
                        <div className={style.text}>
                            <p className="font--h1">
                                {stat.value}
                                <span className={`font__jost--xs ${style.change} ${stat.change < 0 ? "font_color_yellow" : "font_color_green"}`}>{stat.change}%</span>
                            </p>
                            <p className="font__jost--xs font_color_text">{stat.name}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Statistics;