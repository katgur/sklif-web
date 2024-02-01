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
    const [modalState, setModalState] = useState({ enabled: true, coords: {top: 0, left: 0} });

    const onCancelButtonClick = () => {
        navigate(-1);
        setModalState({
            enabled: false,
            coords: {}
        })
    }
    
    const submitAction = () => {
        dispatch(removeUser({ email: user.email }));
        onCancelButtonClick();
    }
    
    const submit = { name: "ok", text: "Удалить", style: "filled-button", action: submitAction }
    
    return (
        <Modal state={modalState} className="modal-shaded">
            <div className="rounded-card delete-form">
                <h3>Удаление пользователя</h3>
                { user && <p className="text-font">{`Вы уверены, что хотите удалить пользователя ${user.lastName} ${user.firstName} ${user.patronymic}?`}</p> }
                <div>
                    <span className="outline-button" onClick={onCancelButtonClick}>Отмена</span>
                    <Form submit={submit} />
                </div>
            </div>
        </Modal>
    )
}

export default DeleteUserForm;