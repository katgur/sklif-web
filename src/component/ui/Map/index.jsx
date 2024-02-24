import MapPicture from './map.svg?react';
import PlusIcon from './plus.svg?react';
import MinusIcon from './minus.svg?react';
import './Map.css';
import { useEffect, useState } from 'react';
import Popup from '../Popup';
import { countries } from '../../../util/country';

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

    return (
        <div className="map">
            <MapPicture />
            <div className="map__panel">
                <button className="map__button">
                    <PlusIcon />
                </button>
                <button className="map__button">
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