import Form from '../../component/ui/Form';
import Modal from '../../component/ui/Modal';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import useUser from '../../hook/useUser';
import { useDispatch } from 'react-redux';
import { removeUser } from './usersSlice';

function DeleteUserForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useUser();
    const [modalState, setModalState] = useState({ enabled: true, coords: { top: 0, left: 0 } });

    const onCancel = () => {
        navigate(-1);
        setModalState({
            enabled: false,
            coords: {}
        })
    }

    const onSubmit = () => {
        dispatch(removeUser({ email: user.email }));
        onCancel();
    }

    return (
        // <Modal state={modalState} className="modal-shaded">
        <Form onSubmit={onSubmit} onCancel={onCancel}>
            <h1>Удаление пользователя</h1>
            {user && <p className="text-font">{`Вы уверены, что хотите удалить пользователя ${user.lastName} ${user.firstName} ${user.patronymic}?`}</p>}
        </Form>
        // </Modal>
    )
}

export default DeleteUserForm;