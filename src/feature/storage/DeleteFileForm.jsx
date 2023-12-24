import { removeDirectory, removeFile } from "./storageSlice";
import Form from '../../component/ui/Form.jsx';
import Modal from '../../component/ui/Modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { isDirectory } from '../../util/storageUtil';

function DeleteFileForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState({ enabled: true, coords: {top: 0, left: 0} });
    var id = window.location.href.split('?id=')[1];

    const onCancelButtonClick = () => {
        navigate(-1);
        setModalState({
            enabled: false,
            coords: {}
        })
    }
    
    const submitAction = () => {
        if (isDirectory(id)) {
            dispatch(removeDirectory({ folderName: id.slice(0, -1) }));
        } else {
            dispatch(removeFile({ fileNames: [id] }));
        }
        onCancelButtonClick();
    }
    
    const submit = { name: "ok", text: "Удалить", style: "filled-button", action: submitAction }
    
    return (
        <Modal state={modalState} className="modal-shaded">
            <div className="rounded-card delete-form">
                <h3>Удаление файла</h3>
                <p className="text-font">{`Вы уверены, что хотите удалить файл ${id}?`}</p>
                <div>
                    <span className="outline-button" onClick={onCancelButtonClick}>Отмена</span>
                    <Form submit={submit} />
                </div>
            </div>
        </Modal>
    )
}

export default DeleteFileForm;