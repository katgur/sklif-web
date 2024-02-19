import Form from '../../component/ui/Form';
import Modal from '../../component/ui/Modal';
import { useNavigate, useParams } from 'react-router';
import useUser from '../../hook/useUser';
import { useDispatch } from 'react-redux';
import { deleteUser } from './usersSlice';

function DeleteUserForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { email } = useParams();
    const user = useUser(email);

    if (!user) {
        return;
    }

    const onCancel = () => {
        navigate(-1);
    }

    const onSubmit = () => {
        dispatch(deleteUser(user.email));
        onCancel();
    }

    return (
        <Modal isVisible={true} onClose={onCancel}>
            <Form
                title={`Вы уверены, что хотите удалить пользователя ${user.firstName} ${user.lastName} ${user.patronymic}?`}
                onSubmit={onSubmit}
                onCancel={onCancel} />
        </Modal>
    )
}

export default DeleteUserForm;