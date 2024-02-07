import { useLayoutEffect, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import './Popup.css'

function computePosition(rect, selfRect, position) {
    if (!rect) {
        return [0, 0];
    }
    const [x, y] = position.split(' ');
    const res = [0, 0];
    if (x === 'left') {
        res[0] = rect.left;
    } else if (x === 'center') {
        res[0] = rect.left;
    } else if (x === 'right') {
        res[0] = rect.right;
    } else {
        throw new Error('Invalid position value ' + x);
    }
    if (y === 'top') {
        res[1] = rect.top - selfRect.height;
    } else if (y === 'center') {
        res[1] = rect.y - selfRect.height / 2;
    } else if (y === 'bottom') {
        res[1] = rect.bottom;
    } else {
        throw new Error('Invalid position value ' + y);
    }
    return res;
}


function PopupContent({ targetRect, children, position = 'center bottom' }) {
    const ref = useRef(null);
    const [tooltipRect, setTooltipRect] = useState({});

    useLayoutEffect(() => {
        const rect = ref.current.getBoundingClientRect();
        setTooltipRect(rect);
    }, []);

    const [x, y] = computePosition(targetRect, tooltipRect, position);

    return createPortal(
        <div
            style={{
                position: 'absolute',
                pointerEvents: 'none',
                left: 0,
                top: 0,
                transform: `translate3d(${x}px, ${y}px, 0)`
            }}>
            <div ref={ref}>
                {children}
            </div>
        </div>,
        document.body,
    );
}

export default PopupContent;