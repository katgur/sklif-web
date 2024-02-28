import style from './style.module.css'

function Details({ title, items }) {
    if (!items) {
        return;
    }

    return (
        <div className={`${style.wrapper} font_color_text`}>
            <details className={style.details}>
                <summary className={`${style.title} font__jost--sm`}>{title}</summary>
            </details>
            <ul className={style.content}>
                {
                    items.map(item => {
                        return (
                            <li key={item} className={`${style.item} font__inter--sm`}>{item}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Details