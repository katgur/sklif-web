import { getToolState, clearToolState, ProbeTool, CobbAngleTool, addToolState, removeToolState, init, ZoomTool, PanTool, WwwcTool, AngleTool, EllipticalRoiTool, LengthTool, RectangleRoiTool, FreehandRoiTool, setToolActive, setToolPassive, addToolForElement } from 'cornerstone-tools';
import { updateImage, reset } from 'cornerstone-core';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import ViewerToolbar from '../../component/ui/ViewerToolbar';

const tools = {
    'Zoom': ZoomTool,
    'Pan': PanTool,
    'Wwwc': WwwcTool,
    'Length': LengthTool,
    'Angle': AngleTool,
    'CobbAngle': CobbAngleTool,
    'Probe': ProbeTool,
    'RectangleRoi': RectangleRoiTool,
    'EllipticalRoi': EllipticalRoiTool,
    'FreehandRoi': FreehandRoiTool,
}

function Toolbar({ viewport, onBurgerClick, onMaskClick }) {
    const [enabledTool, setEnabledTool] = useState(null);
    const markings = useRef([]);
    const markingIndex = useRef(-1);


    useEffect(() => {
        init();
        const element = viewport.current;
        for (const key in tools) {
            addToolForElement(element, tools[key]);
        }
    }, [])

    useEffect(() => {
        const onMeasurementCompleted = (e) => {
            const id = e.detail.measurementData.uuid;
            const toolName = e.detail.toolName;
            if (!markings.current.find(marking => marking.id === id)) {
                if (markingIndex.current === markings.current.length - 1) {
                    markings.current.push({ id, toolName });
                    markingIndex.current = markingIndex.current + 1;
                } else {
                    markings.current = [{ id, toolName }];
                    markingIndex.current = 0;
                }
            }
        }

        const element = viewport.current;
        element.addEventListener('cornerstonetoolsmeasurementcompleted', onMeasurementCompleted);
        return () => {
            element.removeEventListener('cornerstonetoolsmeasurementcompleted', onMeasurementCompleted);
        }
    }, [])

    const element = viewport.current;

    const onToolClick = (toolName) => {
        if (toolName === enabledTool) {
            setToolPassive(toolName);
        } else {
            setToolActive(toolName, { mouseButtonMask: 1 })
        }
        setEnabledTool(toolName);
    }

    const setVisibility = (id, toolName, visibility) => {
        const data = Object.assign([], getToolState(element, toolName).data);
        const current = data.map(d => d.uuid).indexOf(id);
        removeToolState(element, toolName, data[current]);
        data[current].visible = visibility;
        addToolState(element, toolName, data[current]);
    }

    const undo = () => {
        if (markingIndex.current === -1) {
            return;
        }
        const currentMarking = markings.current[markingIndex.current];
        setVisibility(currentMarking.id, currentMarking.toolName, false);
        markingIndex.current = markingIndex.current - 1;
        updateImage(element);
    }

    const redo = () => {
        if (markingIndex.current === markings.current.length - 1) {
            return;
        }
        markingIndex.current = markingIndex.current + 1;
        const currentMarking = markings.current[markingIndex.current];
        setVisibility(currentMarking.id, currentMarking.toolName, true);
        updateImage(element);
    }

    const clearViewport = () => {
        for (const key in tools) {
            clearToolState(element, key);
        }
        updateImage(element);
        markings.current = [];
        markingIndex.current = -1;
    }

    const toolbarProps = {
        enabledTool,
        viewport,
        undo,
        redo,
        resetViewport: () => reset(element),
        clearViewport,
        onBurgerClick,
        onMaskClick,
        onToolClick,
    }

    return (
        <ViewerToolbar {...toolbarProps} />
    )
}

export default Toolbar;