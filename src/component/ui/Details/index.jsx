import { useState } from 'react';
import './Details.css';

function Details({ title, items }) {
    if (!items) {
        return;
    }

    return (
        <div className="card font_color_text details">
            <details className="details__details">
                <summary className="details__title font__jost--sm">{title}</summary>
            </details>
            <ul className="details__content">
                {
                    items.map(item => {
                        return (
                            <li key={item} className="details__item font__inter--sm">{item}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Details