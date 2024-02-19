import { useEffect } from "react";
import Viewport from "./Viewport";
import { useState } from "react";
import { init, StackScrollMouseWheelTool, addStackStateManager, addToolState, addToolForElement, setToolActive } from 'cornerstone-tools';
import Scroll from "../../component/ui/Scroll";
import { chevronLeftIcon, chevronRightIcon } from "../../res/svg";
import StackViewportWrapper from "../../component/ui/StackViewportWrapper";
import StackViewportLayer from "../../component/ui/StackViewportWrapper/StackViewportLayer";

const info = [
    'Zoom', 'Горизонтальное смещение', 'Вертикальное смещение', 'WW/WC'
]

function StackViewport({ imageIds, viewport, index, setIndex }) {
    const [viewportInfo, setViewportInfo] = useState({});

    useEffect(() => {
        const element = viewport.current;
        init();
        addToolForElement(element, StackScrollMouseWheelTool);
        addStackStateManager(element, ['stack']);
        addToolState(element, 'stack', {
            currentImageIdIndex: index,
            imageIds: imageIds,
        });
    }, [])

    useEffect(() => {
        const onStackScroll = (e) => {
            setIndex(e.detail.newImageIdIndex);
        }

        const onImageRendered = (e) => {
            const viewport = e.detail.viewport;
            if (!viewport) {
                return;
            }
            setViewportInfo({
                'Zoom': viewport.scale.toFixed(2),
                'Горизонтальное смещение': viewport.translation.x.toFixed(2),
                'Вертикальное смещение': viewport.translation.y.toFixed(2),
                'WW/WC': `${viewport.voi.windowWidth.toFixed(2)}/${viewport.voi.windowCenter.toFixed(2)}`,
            })
        }

        const element = viewport.current;

        element.addEventListener('cornerstonetoolsstackscroll', onStackScroll);
        element.addEventListener('cornerstoneimagerendered', onImageRendered);

        return () => {
            element.removeEventListener('cornerstonetoolsstackscroll', onStackScroll);
            element.removeEventListener('cornerstoneimagerendered', onImageRendered);
        }
    }, [])

    useEffect(() => {
        setToolActive('StackScrollMouseWheel', {});
    }, [index])

    const onBackButtonClick = () => {
        setIndex(Math.max(0, index - 1));
    }

    const onForwardButtonClick = () => {
        setIndex(Math.min(imageIds.length - 1, index + 1));
    }

    return (
        <StackViewportWrapper>
            <Scroll total={imageIds.length} current={index} />
            <Viewport imageId={imageIds[index]} viewport={viewport} style={{ height: "85vh", width: "600px" }} />
            <StackViewportLayer style={{ left: "0", top: window.innerHeight / 2 - 90 }}>
                <button onClick={onBackButtonClick}>{chevronLeftIcon}</button>
            </StackViewportLayer>
            <StackViewportLayer style={{ right: "0", top: window.innerHeight / 2 - 90 }}>
                <button onClick={onForwardButtonClick}>{chevronRightIcon}</button>
            </StackViewportLayer>
            <StackViewportLayer style={{ top: "0", right: "0" }}>
                {`${index + 1}/${imageIds.length}`}
            </StackViewportLayer>
            <StackViewportLayer style={{ bottom: "0", left: "0" }}>
                {info.map((i) => {
                    return viewportInfo[i] !== undefined && <div key={i}>{`${i}: ${viewportInfo[i]}`}</div>
                })}
            </StackViewportLayer>
        </StackViewportWrapper>
    )
}

export default StackViewport;