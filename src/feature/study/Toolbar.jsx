import { getToolState, clearToolState, ProbeTool, CobbAngleTool, addToolState, removeToolState, init, ZoomTool, PanTool, WwwcTool, AngleTool, EllipticalRoiTool, LengthTool, RectangleRoiTool, FreehandRoiTool, setToolActive, setToolPassive, addToolForElement } from 'cornerstone-tools';
import { updateImage, reset } from 'cornerstone-core';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import zoomIcon from '../../res/Zoom.svg';
import panIcon from '../../res/Pan.svg';
import wwwcIcon from '../../res/Wwwc.svg';
import lengthIcon from '../../res/Length.svg';
import angleIcon from '../../res/Angle.svg';
import rectangleIcon from '../../res/RectangleRoi.svg';
import ellipseIcon from '../../res/EllipseRoi.svg';
import freehandIcon from '../../res/FreehandRoi.svg';
import probeIcon from '../../res/probe.svg';
import cobbAngleIcon from '../../res/cobb-angle.svg';
import undoIcon from '../../res/undo.svg';
import redoIcon from '../../res/redo.svg';
import resetIcon from '../../res/reset-svgrepo-com.svg';
import deleteIcon from '../../res/delete.svg';
import burgerIcon from '../../res/burger.svg';
import magicIcon from '../../res/magic-wand-svgrepo-com.svg';
import { useSelector } from 'react-redux';
import { selectResult } from './maskSlice';

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

const icons = {
    'Zoom': zoomIcon,
    'Pan': panIcon,
    'Wwwc': wwwcIcon,
    'Length': lengthIcon,
    'Angle': angleIcon,
    'CobbAngle': cobbAngleIcon,
    'Probe': probeIcon,
    'RectangleRoi': rectangleIcon,
    'EllipticalRoi': ellipseIcon,
    'FreehandRoi': freehandIcon,
}

const titles = {
    'Zoom': 'Зум',
    'Pan': 'Перетаскивание',
    'Wwwc': 'Яркость',
    'Length': 'Линейка',
    'Angle': 'Угломер',
    'RectangleRoi': 'Прямоугольник',
    'EllipticalRoi': 'Эллипс',
    'FreehandRoi': 'Произвольная область',
}

function Toolbar({ viewport, onBurgerClick, onMaskClick, maskState }) {
    const [isEnabled, setEnabled] = useState({});
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
    }, [element, isEnabled, setEnabled])

    var onToolClick = (toolName) => {
        var newIsEnabled = {};
        if (isEnabled[toolName]) {
            setToolPassive(toolName);
            newIsEnabled[toolName] = false;
        } else {
            setToolActive(toolName, { mouseButtonMask: 1 })
            newIsEnabled[toolName] = true;
        }
        setEnabled(newIsEnabled);
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
        <div className="toolbar-wrapper" style={{height: "15vh"}}>
            <div className="toolbar">

                {
                    Object.keys(tools).map((key) => {
                        var className = "viewer-button" + (isEnabled[key] ? "__selected" : "");
                        return <img key={key}
                            onClick={() => onToolClick(key)}
                            className={className} src={icons[key]} alt={key} title={titles[key]} />
                    })
                }
                <img key="mask" onClick={onMaskClick} src={magicIcon} className="viewer-button" alt="mask" title="Разметка ИИ" />
            </div>
            <div className="comment-section">
                {result.volume && maskState.enabled && <p className="white-font">{`Объем пораженной ткани: ${result.volume} cm3`}</p>}
            </div>
            <div className="toolbar">
                <img onClick={undo} className="viewer-button" src={undoIcon} alt="undo" />
                <img onClick={redo} className="viewer-button" src={redoIcon} alt="redo" />
                <img onClick={resetViewport} className="viewer-button" src={resetIcon} alt="reset" />
                <img onClick={clearViewport} className="viewer-button" src={deleteIcon} alt="clear" />
                <img onClick={onBurgerClick} className="viewer-button" src={burgerIcon} alt="burger" />
            </div>
        </div>
    )
}

export default Toolbar;