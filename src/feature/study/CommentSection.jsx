import { useEffect, useRef, useState } from "react";
import editIcon from '../../res/edit.svg';
import { resetCommentAdded, selectCommentAdded } from "./studiesSlice";
import { useDispatch, useSelector } from "react-redux";

var editableArea = (textArea, onSaveButtonClick) => {
    return (
        <>
            <textarea ref={textArea}>
            </textarea>
            <div onClick={onSaveButtonClick} className="outline-button">Сохранить</div>
        </>
    )
}

var nonEditableArea = (comments) => {
    return (
        <p>
            {comments}
        </p>
    )
}

function CommentSection({ comments, onSave }) {
    const textArea = useRef();
    const commentsToAdd = useRef();
    var commentAdded = useSelector(selectCommentAdded);
    const [state, setState] = useState({
        edit: false,
        comments: undefined,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (commentAdded) {
            setState({
                edit: false,
                comments: state.comments + "\n" + commentsToAdd.current
            })
            dispatch(resetCommentAdded());
        } else {
            if (state.comments === undefined) {
                setState({
                    edit: state.edit,
                    comments: comments ? comments.join("\n") : ""
                });
            }
        }
    }, [commentAdded, comments, dispatch, state])

    var onSaveButtonClick = () => {
        commentsToAdd.current = textArea.current.value;
        onSave(commentsToAdd.current);
    }

    return (
        <div className="comment-section">
            <img onClick={() => setState({ edit: true, comments: state.comments })} style={{ cursor: "pointer" }} width="24" height="24" src={editIcon} alt="edit" />
            {state.edit ?
                editableArea(textArea, onSaveButtonClick) :
                nonEditableArea(state.comments)}
        </div>
    )
}

export default CommentSection;