import { useLayoutEffect, useState, useRef, useEffect } from "react";
import Portal from "../Modal/Portal";
import { createPortal } from "react-dom";
import './Popup.css'
import TooltipContainer from "./TooltipContainer";

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


function Popup({ targetRect, children, position = 'center bottom' }) {
    const ref = useRef(null);
    const [tooltipRect, setTooltipRect] = useState({});

    useLayoutEffect(() => {
        const rect = ref.current?.getBoundingClientRect() || {};
        setTooltipRect(rect);
    }, []);

    const [tooltipX, tooltipY] = computePosition(targetRect, tooltipRect, position);

    return createPortal(
        <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
            {children}
        </TooltipContainer>,
        document.body
    );
}

export default Popup;