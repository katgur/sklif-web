import { useState } from "react";
import ContextMenu from "../ContextMenu";
import Popup from "../Popup";
import Card from '../Card';
import moreIcon from '../../../res/more-alt.svg';
import refreshIcon from '../../../res/idea-reload.svg';
import deleteIcon from '../../../res/trash-can.svg';
import { backIcon } from '../../../res/svg';
import './StorageToolPanel.css';

function StorageToolPanel({ children, current, isEditMode, onDeleteButtonClick, onRefreshButtonClick, onBackButtonClick }) {
    const [target, setTarget] = useState(null);

    const onPlusButtonClick = (e) => {
        setTarget(target ? null : e.target)
    }

    return (
        <Card padding="sm">
            {
                isEditMode ?
                    <ul className="tools">
                        <li>
                            <button onClick={onDeleteButtonClick}>
                                <img src={deleteIcon} />
                            </button>
                        </li>
                        <li>
                            <button onClick={onRefreshButtonClick}>
                                <img src={refreshIcon} />
                            </button>
                        </li>
                    </ul> :
                    <div className="tools font__inter--sm font_color_text">
                        {current &&
                            <span>
                                <button className="tools__button" onClick={onBackButtonClick}>
                                    {backIcon}
                                </button>
                                {current}
                            </span>
                        }
                        <span className="tools__right">
                            <button onClick={onPlusButtonClick}>
                                <img src={moreIcon} />
                            </button>
                        </span>
                    </div>
            }
            <Popup target={target} setTarget={setTarget} position="left bottom">
                <ContextMenu>
                    {children}
                </ContextMenu>
            </Popup>
        </Card>
    )
}

export default StorageToolPanel