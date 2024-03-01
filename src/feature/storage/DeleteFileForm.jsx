import { deleteDirectory, deleteFiles } from "./storageSlice";
import { Form, Modal } from 'tailwind-admin';
import useApiDispatch from "../../hook/useApiDispatch.js";
import { useNavigate } from 'react-router';
import { isDirectory } from '../../util/storageUtil';

function DeleteFileForm() {
    const navigate = useNavigate();
    const dispatch = useApiDispatch();
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