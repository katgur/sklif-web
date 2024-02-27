import MapPicture from './map.svg?react';
import PlusIcon from './plus.svg?react';
import MinusIcon from './minus.svg?react';
import './Map.css';
import { useEffect, useState } from 'react';
import Popup from '../Popup';
import { countries } from '../../../util/country';

let prevMouse = null;

function Map({ data }) {
    const [target, setTarget] = useState(null);
    const [scale, setScale] = useState(0.63);
    const [translate, setTranslate] = useState([0, 80]);

    useEffect(() => {
        const regions = document.querySelectorAll(".map__region");
        regions.forEach(region => {
            region.style.opacity = (data[region.dataset.code] / 200 || 0) + 0.5;
        })
    }, [])

    function onMouseOver(e) {
        setTarget(e.target);
    }

    function onMouseOut() {
        setTarget(null);
    }

    function onMouseDown(e) {
        prevMouse = { x: e.screenX, y: e.screenY };
    }

    function onMouseUp() {
        prevMouse = null;
    }

    function onMouseMove(e) {
        if (!prevMouse) {
            return;
        }
        const { screenX, screenY } = e;
        setTranslate([translate[0] + screenX - prevMouse.x, translate[1] + screenY - prevMouse.y]);
        prevMouse.x = screenX;
        prevMouse.y = screenY;
    }

    const onPlusClick = () => {
        setScale(scale * 1.5);
    }

    const onMinusClick = () => {
        setScale(scale / 1.5);
    }

    return (
        <div className="map">
            <svg width="100%" height="380px" onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                <defs></defs>
                <g onMouseOver={onMouseOver} onMouseOut={onMouseOut} transform={`scale(${scale}) translate(${translate[0]}, ${translate[1]})`}>
                    <MapPicture />
                </g></svg>
            <div className="map__panel">
                <button className="map__button" onClick={onPlusClick}>
                    <PlusIcon />
                </button>
                <button className="map__button" onClick={onMinusClick}>
                    <MinusIcon />
                </button>
            </div>
            <Popup target={target} setTarget={setTarget} position="center bottom">
                <div className="map__tooltip font__jost--xs">
                    {countries[target && target.dataset.code]}    {data[target && target.dataset.code]}
                </div>
            </Popup>
        </div>
    )
}

export default Map;