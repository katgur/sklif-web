import { useState } from "react";
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
                <ContextMenu theme="dark">
                    <button onClick={() => setIsEditMode(true)}>
                        Редактировать
                    </button>
                    <button onClick={() => setIsEditMode(false)} disabled={!isEditMode}>
                        Отмена
                    </button>
                </ContextMenu>
            </ToolPanel>
            {
                isEditMode ?
                    <Form onSubmit={onSubmit} entity={{ comments }}>
                        <TextArea theme="dark" field={{ name: "comments", text: "Комментарии к исследованию", required: true }} />
                    </Form> :
                    <p>{comments}</p>
            }
        </>
    )
}

export default CommentSection;