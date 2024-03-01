import { useState } from "react";
import EditIcon from '../../assets/edit.svg?react';
import CloseIcon from '../../assets/close.svg?react';
import { addComment } from "./studiesSlice";
import useApiDispatch from "../../hook/useApiDispatch.js";
import { Form, TextArea, ToolPanel, ContextMenu } from 'tailwind-admin';

function CommentSection({ _key, comments }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const dispatch = useApiDispatch();

    const onSubmit = (data) => {
        dispatch(addComment(_key, data.comments))
    }

    return (
        <>
            <ToolPanel>
                <ContextMenu style="dark">
                    <button onClick={() => setIsEditMode(true)}>
                        <EditIcon />
                        <span>Редактировать</span>
                    </button>
                    <button onClick={() => setIsEditMode(false)} disabled={!isEditMode}>
                        <CloseIcon />
                        <span>Отмена</span>
                    </button>
                </ContextMenu>
            </ToolPanel>
            {
                isEditMode ?
                    <Form onSubmit={onSubmit} entity={{ comments }}>
                        <TextArea field={{ name: "comments", text: "Комментарии к исследованию", required: true }} />
                    </Form> :
                    <p>{comments}</p>
            }
        </>
    )
}

export default CommentSection;