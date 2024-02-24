import './Rating.css';
import { countries } from '../../../util/country';

function Rating({ data, limit }) {
    const top = Object.keys(data).sort((key1, key2) => data[key2] - data[key1]).slice(0, limit);

    return (
        <ul className="font__jost--sm rating">
            {
                top.map(code => (
                    <li className="rating__item">
                        <span className="rating__text">
                            {countries[code]}
                        </span>
                        <div className="rating__track">
                            <div className="rating__thumb" style={{ width: `${data[code]}%` }}>
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