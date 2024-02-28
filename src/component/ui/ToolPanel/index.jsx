import { useState } from "react";
import Popup from "../Popup";
import MoreIcon from './more-alt.svg?react';
import RefreshIcon from './idea-reload.svg?react';
import DeleteIcon from './trash-can.svg?react';
import BackIcon from './back.svg?react';
import style from './style.module.css'

function ToolPanel({ children, current, isEditMode, onDeleteButtonClick, onRefreshButtonClick, onBackButtonClick }) {
    const [target, setTarget] = useState(null);

    const onPlusButtonClick = (e) => {
        setTarget(target ? null : e.target)
    }

    return (
        <>
            {
                isEditMode ?
                    <ul className={style.tools}>
                        <li>
                            <button onClick={onDeleteButtonClick}>
                                <DeleteIcon />
                            </button>
                        </li>
                        <li>
                            <button onClick={onRefreshButtonClick}>
                                <RefreshIcon />
                            </button>
                        </li>
                    </ul> :
                    <div className={`${style.tools} font__inter--sm font_color_text`}>
                        {current &&
                            <span>
                                <button className={style.button} onClick={onBackButtonClick}>
                                    <BackIcon />
                                </button>
                                {current}
                            </span>
                        }
                        <span className={style.right}>
                            <button onClick={onPlusButtonClick}>
                                <MoreIcon />
                            </button>
                        </span>
                    </div>
            }
            <Popup target={target} setTarget={setTarget} position="left bottom">
                {children}
            </Popup>
        </>
    )
}

export default ToolPanel