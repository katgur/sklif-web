import MapPicture from './map.svg?react';
import PlusIcon from './plus.svg?react';
import MinusIcon from './minus.svg?react';
import './Map.css';
import { useEffect, useState } from 'react';
import Popup from '../Popup';
import { countries } from '../../../util/country';

let scale = 0.6333333333333333;

function Map({ data }) {
    const [target, setTarget] = useState(null);

    useEffect(() => {
        function onMouseOver(e) {
            setTarget(e.target);
        }
        function onMouseOut() {
            setTarget(null);
        }
        const regions = document.querySelectorAll(".map__region");
        regions.forEach(region => {
            region.addEventListener("mouseover", onMouseOver);
            region.addEventListener("mouseout", onMouseOut);
            region.style.opacity = (data[region.dataset.code] / 200 || 0) + 0.5;
        })
        return () => {
            regions.forEach(region => {
                region.removeEventListener("mouseover", onMouseOver);
                region.removeEventListener("mouseout", onMouseOut);
            })
        }
    }, [])

    const mapGroup = document.querySelector("#map__regions-group");

    const onPlusClick = () => {
        scale *= 1.5;
        mapGroup.style.transform = `scale(${scale})`;
    }

    const onMinusClick = () => {
        scale /= 1.5;
        mapGroup.style.transform = `scale(${scale})`;
    }

    return (
        <div className="map">
            <MapPicture />
            <div className="map__panel">
                <button className="map__button" onClick={onPlusClick}>
                    <PlusIcon />
                </button>
                <button className="map__button" onClick={onMinusClick}>
                    <MinusIcon />
                </button>
            </div>
            <Popup target={target} setTarget={setTarget} position="center center">
                <div className="map__tooltip font__jost--xs">
                    {countries[target && target.dataset.code]}    {data[target && target.dataset.code]}
                </div>
            </Popup>
        </div>
    )
}

export default Map;