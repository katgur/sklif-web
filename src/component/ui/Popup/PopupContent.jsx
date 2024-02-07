import { useLayoutEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

function computePosition(rect, selfRect, position) {
    function layoutWithLeftBorder(left) {
        return Math.max(4, left);
    }
    function layoutWithTopBorder(right) {
        return Math.max(4, right);
    }
    function layoutWithRightBorder(top) {
        return Math.min(window.innerWidth - selfRect.width - 4, top);
    }
    function layoutWithBottomBorder(bottom) {
        return Math.min(window.innerHeight - selfRect.height - 4, bottom);
    }
    const [x, y] = position.split(' ');
    const res = [];
    switch (x) {
        case 'left':
            res[0] = layoutWithLeftBorder(rect.left - selfRect.width - 4);
            break;
        case 'center':
            res[0] = layoutWithRightBorder(layoutWithLeftBorder(rect.left - selfRect.width / 2 + rect.width / 2));
            break;
        case 'right':
            res[0] = layoutWithRightBorder(rect.right + 4);
            break;
        default:
            throw new Error('Invalid position value ' + x);
    }
    switch (y) {
        case 'top':
            res[1] = layoutWithTopBorder(rect.top - selfRect.height - 4);
            break;
        case 'center':
            res[1] = layoutWithBottomBorder(layoutWithTopBorder(rect.top - selfRect.height / 2 + rect.height / 2));
            break;
        case 'bottom':
            res[1] = layoutWithBottomBorder(rect.bottom + 4);
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
        <div className="popup" style={{ transform: `translate(${x}px, ${y}px)` }}>
            <div ref={ref}>
                {children}
            </div>
        </div>,
        document.body,
    );
}

export default PopupContent;