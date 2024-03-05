import { Form, Modal, Card } from 'tailwind-admin';
import { useNavigate, useParams } from 'react-router';
import useUser from '../../hook/useUser';
import useApiDispatch from "../../hook/useApiDispatch.js";
import { deleteUser } from './usersSlice';

function DeleteUserForm() {
    const navigate = useNavigate();
    const dispatch = useApiDispatch();
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
            <Card>

                <Form
                    title={`Вы уверены, что хотите удалить пользователя ${user.firstName} ${user.lastName} ${user.patronymic}?`}
                    onSubmit={onSubmit}
                    onCancel={onCancel} />
            </Card>
        </Modal>
    )
}

export default DeleteUserForm;