import { useState } from "react";
import Popup from "../Popup";
import MoreIcon from './more-alt.svg?react';
import RefreshIcon from './idea-reload.svg?react';
import DeleteIcon from './trash-can.svg?react';
import BackIcon from './back.svg?react';
import './StorageToolPanel.css';

function StorageToolPanel({ children, current, isEditMode, onDeleteButtonClick, onRefreshButtonClick, onBackButtonClick }) {
    const [target, setTarget] = useState(null);

    const onPlusButtonClick = (e) => {
        setTarget(target ? null : e.target)
    }

    return (
        <>
            {
                isEditMode ?
                    <ul className="tools">
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
                    <div className="tools font__inter--sm font_color_text">
                        {current &&
                            <span>
                                <button className="tools__button" onClick={onBackButtonClick}>
                                    <BackIcon />
                                </button>
                                {current}
                            </span>
                        }
                        <span className="tools__right">
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

export default StorageToolPanel