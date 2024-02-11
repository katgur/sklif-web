import { deleteDirectory, deleteFile } from "./storageSlice";
import Form from '../../component/ui/Form';
import Modal from '../../component/ui/Modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { isDirectory } from '../../util/storageUtil';

function DeleteFileForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState({ enabled: true, coords: { top: 0, left: 0 } });
    var id = window.location.href.split('?id=')[1];

    const onCancel = () => {
        navigate(-1);
        setModalState({
            enabled: false,
            coords: {}
        })
    }

    const onSubmit = () => {
        if (isDirectory(id)) {
            dispatch(deleteDirectory({ folderName: id.slice(0, -1) }));
        } else {
            dispatch(deleteFile({ fileNames: [id] }));
        }
        onCancel();
    }

    return (
        // <Modal state={modalState} className="modal-shaded">
        <Form onSubmit={onSubmit} onCancel={onCancel}>
            <h1>Удаление файла</h1>
            <p className="text-font">{`Вы уверены, что хотите удалить файл ${id}?`}</p>
        </Form>
        // </Modal>
    )
}

export default DeleteFileForm;