import { getToolState, clearToolState, ProbeTool, CobbAngleTool, addToolState, removeToolState, init, ZoomTool, PanTool, WwwcTool, AngleTool, EllipticalRoiTool, LengthTool, RectangleRoiTool, FreehandRoiTool, setToolActive, setToolPassive, addToolForElement } from 'cornerstone-tools';
import { updateImage, reset } from 'cornerstone-core';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectResult } from './maskSlice';
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


function Toolbar({ viewport, onBurgerClick, onMaskClick, maskState }) {
    const [enabledKey, setEnabledKey] = useState(null);
    const markings = useRef([]);
    const markingIndex = useRef(-1);
    const element = viewport.current;
    const isInit = useRef(false);
    const result = useSelector(selectResult);

    useEffect(() => {
        var onMeasurementCompleted = (e) => {
            var id = e.detail.measurementData.uuid;
            var toolName = e.detail.toolName;
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

        if (!element) {
            return;
        }

        if (!isInit.current) {
            init();
            for (var key in tools) {
                addToolForElement(element, tools[key]);
            }
            isInit.current = true;
        }

        element.addEventListener('cornerstonetoolsmeasurementcompleted', onMeasurementCompleted);

        return () => {
            element.removeEventListener('cornerstonetoolsmeasurementcompleted', onMeasurementCompleted);
        }
    }, [element])

    var onToolClick = (toolName) => {
        if (toolName === enabledKey) {
            setToolPassive(toolName);
        } else {
            setToolActive(toolName, { mouseButtonMask: 1 })
        }
        setEnabledKey(toolName);
    }

    var setVisibility = (id, toolName, visibility) => {
        var data = Object.assign([], getToolState(element, toolName).data);
        var current = data.map(d => d.uuid).indexOf(id);
        removeToolState(element, toolName, data[current]);
        data[current].visible = visibility;
        addToolState(element, toolName, data[current]);
    }

    var undo = () => {
        if (markingIndex.current === -1) {
            return;
        }
        var currentMarking = markings.current[markingIndex.current];
        setVisibility(currentMarking.id, currentMarking.toolName, false);
        markingIndex.current = markingIndex.current - 1;
        updateImage(element);
    }

    var redo = () => {
        if (markingIndex.current === markings.current.length - 1) {
            return;
        }
        markingIndex.current = markingIndex.current + 1;
        var currentMarking = markings.current[markingIndex.current];
        setVisibility(currentMarking.id, currentMarking.toolName, true);
        updateImage(element);
    }

    var resetViewport = () => {
        reset(element);
    }

    var clearViewport = () => {
        for (var key in tools) {
            clearToolState(element, key);
        }
        updateImage(element);
        markings.current = [];
        markingIndex.current = -1;
    }

    return (
        <ViewerToolbar enabledKey={enabledKey} viewport={viewport} undo={undo} redo={redo} resetViewport={resetViewport} clearViewport={clearViewport} onBurgerClick={onBurgerClick} onMaskClick={onMaskClick} onToolClick={onToolClick} maskState={maskState} result={result} />
    )
}

export default Toolbar;