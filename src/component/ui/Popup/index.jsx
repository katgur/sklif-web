import { useLayoutEffect, useState, useRef, useEffect } from "react";
import Portal from "../Modal/Portal";
import { createPortal } from "react-dom";
import './Popup.css'
import TooltipContainer from "./TooltipContainer";

function computePosition(rect, selfRect, position) {
    const [x, y] = position.split(' ');
    const res = {};
    if (x === 'left') {
        res.left = rect.left - selfRect.width;
    } else if (x === 'center') {
        res.left = rect.left - rect.width;
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


function Popup({ targetRect, children, position = 'center bottom' }) {
    const ref = useRef(null);
    const [tooltipHeight, setTooltipHeight] = useState(0);

    useLayoutEffect(() => {
        const { height } = ref.current.getBoundingClientRect();
        setTooltipHeight(height);
    }, []);

    let tooltipX = 0;
    let tooltipY = 0;
    if (targetRect !== null) {
        tooltipX = targetRect.left;
        tooltipY = targetRect.top - tooltipHeight;
        if (tooltipY < 0) {
            // It doesn't fit above, so place below.
            tooltipY = targetRect.bottom;
        }
    }

    return createPortal(
        <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
            {children}
        </TooltipContainer>,
        document.body
    );
}

export default Popup;