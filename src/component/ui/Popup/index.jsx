import { useLayoutEffect, useState, useRef, useEffect } from "react";
import Portal from "../Modal/Portal";
import './Popup.css'

function computePosition(rect, selfRect, position) {
    const [x, y] = position.split(' ');
    const res = {};
    if (x === 'left') {
        res.left = rect.left - selfRect.width;
    } else if (x === 'center') {
        res.left = rect.left - rect.width + selfRect.width / 2;
    } else if (x === 'right') {
        res.left = rect.right;
    } else {
        throw new Error('Invalid position value ' + x);
    }
    if (y === 'top') {
        res.top = rect.top - selfRect.height;
    } else if (y === 'center') {
        res.top = rect.y - selfRect.height / 2;
    } else if (y === 'bottom') {
        res.top = rect.bottom;
    } else {
        throw new Error('Invalid position value ' + y);
    }
    console.log(rect, selfRect);
    return res;
}


function Popup({ anchor, children, position = 'center bottom' }) {
    const [point, setPoint] = useState(null);
    const ref = useRef();

    const resetPoint = () => setPoint(computePosition(anchor.getBoundingClientRect(), ref.current.getBoundingClientRect(), position));

    useLayoutEffect(() => {
        if (!anchor) {
            setPoint(null);
            return;
        }
        resetPoint();
    }, [anchor])

    useLayoutEffect(() => {
        document.addEventListener('resize', resetPoint);
        return () => {
            document.removeEventListener('resize', resetPoint);
        }
    }, [])

    return (
        <Portal id="popup">
            <div className="popup" style={point} ref={ref}>
                {children}
            </div>
        </Portal>
    );
}

export default Popup;