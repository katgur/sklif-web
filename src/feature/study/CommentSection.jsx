import { useState } from "react";
import editIcon from '../../res/edit.svg';
import { addComment } from "./studiesSlice";
import { useDispatch } from "react-redux";
import Form from '../../component/ui/Form';
import TextArea from "../../component/ui/Form/TextArea";
import StorageToolPanel from '../../component/ui/StorageToolPanel';
import ContextMenu from "../../component/ui/ContextMenu";

function CommentSection({ _key, comments }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(addComment(_key, data.comments))
    }

    return (
        <>
            <StorageToolPanel>
                <ContextMenu style="dark">
                    <button onClick={() => setIsEditMode(true)}>
                        <img src={editIcon} width="24" height="24" alt="Редактировать комментарии к исследованию." />
                        <span>Редактировать</span>
                    </button>
                    <button onClick={() => setIsEditMode(false)} disabled={!isEditMode}>
                        <img src={editIcon} width="24" height="24" alt="Отменить редактирование комментариев к исследованию." />
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