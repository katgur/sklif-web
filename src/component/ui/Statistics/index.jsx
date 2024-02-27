import "./Stats.css";

function Statistics({ data }) {
    return (
        <div className="stats">
            {
                data.map(stat => (
                    <div className="stats__item">
                        <div className="stats__text">
                            <p className="font--h1">
                                {stat.value}
                                <span className={`font__jost--xs stats__change ${stat.change < 0 ? "font_color_yellow" : "font_color_green"}`}>{stat.change}%</span>
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