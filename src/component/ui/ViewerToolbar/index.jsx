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
import style from './style.module.css'

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
    'CobbAngle': 'Угломер 2',
    'RectangleRoi': 'Прямоугольник',
    'EllipticalRoi': 'Эллипс',
    'FreehandRoi': 'Произвольная область',
}

function ViewerToolbar({ onBurgerClick, onMaskClick, onToolClick, enabledTool, undo, redo, resetViewport, clearViewport }) {
    return (
        <div className={style.wrapper}>
            <div className={style.toolbar}>

                {
                    Object.keys(titles).map((key) => {
                        var className = `${style.button}${key === enabledTool ? " " + style.selected : ""}`;
                        return <img key={key}
                            onClick={() => onToolClick(key)}
                            className={className} src={icons[key]} alt={key} title={titles[key]} />
                    })
                }
                <img key="mask" onClick={onMaskClick} src={magicIcon} className={style.button} alt="mask" title="Разметка ИИ" />
            </div>
            <div className={style.toolbar}>
                <img onClick={undo} className={style.button} src={undoIcon} alt="undo" />
                <img onClick={redo} className={style.button} src={redoIcon} alt="redo" />
                <img onClick={resetViewport} className={style.button} src={resetIcon} alt="reset" />
                <img onClick={clearViewport} className={style.button} src={deleteIcon} alt="clear" />
                <img onClick={onBurgerClick} className={style.button} src={burgerIcon} alt="burger" />
            </div>
        </div>
    )
}

export default ViewerToolbar