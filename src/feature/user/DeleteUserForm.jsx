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

    const onCancel = () => {
        navigate(-1);
    }

    const onSubmit = () => {
        dispatch(removeUser({ email: user.email }));
        onCancel();
    }

    return (
        <Modal isVisible={true} onClose={onCancel}>
            <Form onSubmit={onSubmit} onCancel={onCancel}>
                {user && <p className="text-font">{`Вы уверены, что хотите удалить пользователя ${user.lastName} ${user.firstName} ${user.patronymic}?`}</p>}
            </Form>
        </Modal>
    )
}

export default DeleteUserForm;