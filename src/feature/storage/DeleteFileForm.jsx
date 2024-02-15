import { deleteDirectory, deleteFiles } from "./storageSlice";
import Form from '../../component/ui/Form';
import Modal from '../../component/ui/Modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { isDirectory } from '../../util/storageUtil';

function DeleteFileForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = window.location.href.split('?id=')[1];

    const onCancel = () => {
        navigate(-1);
    }

    const onSubmit = () => {
        if (isDirectory(id)) {
            dispatch(deleteDirectory(id));
        } else {
            dispatch(deleteFiles([id]));
        }
        navigate(-1);
    }

    return (
        <Modal isVisible={true}>
            <Form
                title={`Вы уверены, что хотите удалить файл ${id}?`}
                onSubmit={onSubmit} onCancel={onCancel} />
        </Modal>
    )
}

export default DeleteFileForm;