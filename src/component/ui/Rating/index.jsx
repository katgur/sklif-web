import style from './style.module.css'
import { countries } from '../../../util/country';

function Rating({ data, limit }) {
    const top = Object.keys(data).sort((key1, key2) => data[key2] - data[key1]).slice(0, limit);

    return (
        <ul className={`font__jost--sm ${style.wrapper}`}>
            {
                top.map(code => (
                    <li className={style.item}>
                        <span className={style.text}>
                            {countries[code]}
                        </span>
                        <div className={style.track}>
                            <div className={style.thumb} style={{ width: `${data[code]}%` }}>
                                <span className="font__jost--xxs font_color_white">
                                    {data[code]}%
                                </span>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default Rating;