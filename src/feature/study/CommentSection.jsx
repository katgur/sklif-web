import { useState } from "react";
import EditIcon from '../../assets/edit.svg?react';
import CloseIcon from '../../assets/close.svg?react';
import { addComment } from "./studiesSlice";
import useApiDispatch from "../../hook/useApiDispatch.js";
import Form from '../../component/ui/Form';
import TextArea from "../../component/ui/Form/TextArea";
import StorageToolPanel from '../../component/ui/StorageToolPanel';
import ContextMenu from "../../component/ui/ContextMenu";

function CommentSection({ _key, comments }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const dispatch = useApiDispatch();

    const onSubmit = (data) => {
        dispatch(addComment(_key, data.comments))
    }

    return (
        <>
            <StorageToolPanel>
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
            </StorageToolPanel>
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