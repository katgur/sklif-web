import zoomIcon from './Zoom.svg';
import panIcon from './Pan.svg';
import wwwcIcon from './Wwwc.svg';
import lengthIcon from './Length.svg';
import angleIcon from './Angle.svg';
import rectangleIcon from './RectangleRoi.svg';
import ellipseIcon from './EllipseRoi.svg';
import freehandIcon from './FreehandRoi.svg';
import probeIcon from './probe.svg';
import cobbAngleIcon from './cobb-angle.svg';
import undoIcon from './undo.svg';
import redoIcon from './redo.svg';
import resetIcon from './reset-svgrepo-com.svg';
import deleteIcon from './delete.svg';
import burgerIcon from './burger.svg';
import magicIcon from './magic-wand-svgrepo-com.svg';
import './ViewerToolbar.css';

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

function ViewerToolbar({ result, onBurgerClick, onMaskClick, maskState, onToolClick, enabledKey, undo, redo, resetViewport, clearViewport }) {
    return (
        <div className="toolbar-wrapper" style={{height: "15vh"}}>
            <div className="toolbar">

                {
                    Object.keys(titles).map((key) => {
                        var className = "viewer-button" + (key === enabledKey ? "__selected" : "");
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

export default ViewerToolbar