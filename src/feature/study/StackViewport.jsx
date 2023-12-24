import { useEffect } from "react";
import Viewport from "./Viewport";
import { useState } from "react";
import { enable } from 'cornerstone-core';
import { init, StackScrollMouseWheelTool, addStackStateManager, addToolState, addToolForElement, setToolActive } from 'cornerstone-tools';
import Scroll from "../../component/ui/Scroll";
import { useRef } from "react";
import { chevronLeftIcon, chevronRightIcon } from "../../res/svg";

const info = [
    'Zoom', 'Горизонтальное смещение', 'Вертикальное смещение', 'WW/WC'
]

function StackViewport({ imageIds, viewport, index, setIndex }) {
    const isInit = useRef(false);
    const [viewportInfo, setViewportInfo] = useState({});

    useEffect(() => {
        var onStackScroll = (e) => {
            setIndex(e.detail.newImageIdIndex);
        }

        var onImageRendered = (e) => {
            var viewport = e.detail.viewport;
            if (viewport) {
                setViewportInfo({
                    'Zoom': viewport.scale,
                    'Горизонтальное смещение': viewport.translation.x,
                    'Вертикальное смещение': viewport.translation.y,
                    'WW/WC': `${viewport.voi.windowWidth}/${viewport.voi.windowCenter}`,
                }
                )
            }
        }

        const element = viewport.current;

        if (!isInit.current) {
            init();
            enable(element);
            addStackStateManager(element, ['stack']);
            addToolForElement(element, StackScrollMouseWheelTool);
            setToolActive('StackScrollMouseWheel', {});
            isInit.current = true;
        }

        var stack = {
            currentImageIdIndex: index,
            imageIds: imageIds,
        }
        addToolState(element, 'stack', stack);

        element.addEventListener('cornerstonetoolsstackscroll', onStackScroll);
        element.addEventListener('cornerstoneimagerendered', onImageRendered);

        return () => {
            element.removeEventListener('cornerstonetoolsstackscroll', onStackScroll);
            element.removeEventListener('cornerstoneimagerendered', onImageRendered);
        }
    }, [viewport, setViewportInfo, index, setIndex, imageIds])

    var onBackButtonClick = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    var onForwardButtonClick = () => {
        if (index < imageIds.length - 1) {
            setIndex(index + 1);
        }
    }

    return (
        <div className="stack-viewport">
            <Scroll total={imageIds.length} current={index} />
            <Viewport imageId={imageIds[index]} viewport={viewport} />
            <div className="stack-viewport-layer" style={{ left: "0", top: window.innerHeight / 2 - 90 }}>
                <span onClick={onBackButtonClick}>{chevronLeftIcon}</span>
            </div>
            <div className="stack-viewport-layer" style={{ right: "0", top: window.innerHeight / 2 - 90 }}>
                <span onClick={onForwardButtonClick}>{chevronRightIcon}</span>
            </div>
            <div className="stack-viewport-layer" style={{ top: "0", right: "0" }}>
                {`${index + 1}/${imageIds.length}`}
            </div>
            <div className="stack-viewport-layer" style={{ bottom: "0", left: "0" }}>
                {info.map((i) => {
                    return viewportInfo[i] !== undefined && <div key={i}>{`${i}: ${viewportInfo[i]}`}</div>
                })}
            </div>
        </div>
    )
}

export default StackViewport;