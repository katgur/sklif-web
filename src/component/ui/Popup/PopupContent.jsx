import { useLayoutEffect, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import './Popup.css'

function computePosition(rect, selfRect, position) {
    const [x, y] = position.split(' ');
    const res = [];
    switch (x) {
        case 'left':
            res[0] = rect.left - selfRect.width - 4;
            break;
        case 'center':
            res[0] = rect.left - selfRect.width / 2 + rect.width / 2;
            break;
        case 'right':
            res[0] = rect.left + rect.width + 4;
            break;
        default:
            throw new Error('Invalid position value ' + x);
    }
    switch (y) {
        case 'top':
            res[1] = rect.top - selfRect.height - 4;
            break;
        case 'center':
            res[1] = rect.top - selfRect.height / 2 + rect.height / 2;
            break;
        case 'bottom':
            res[1] = rect.top + rect.height + 4;
            break;
        default:
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