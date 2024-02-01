import Form from '../../component/ui/Form';
import Modal from '../../component/ui/Modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeOrganization } from './orgSlice';
import useOrganization from '../../hook/useOrganization';
import { useNavigate } from 'react-router';

function DeleteOrganizationForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalState, setModalState] = useState({ enabled: true, coords: {top: 0, left: 0} });
    const organization = useOrganization();

    const onCancelButtonClick = () => {
        navigate(-1);
        setModalState({
            enabled: false,
            coords: {}
        })
    }

    const submitAction = () => {
        dispatch(removeOrganization({ organizationName: organization.organizationName }));
        onCancelButtonClick();
    }
    const submit = { name: "ok", text: "Удалить", style: "filled-button", action: submitAction }
    
    return (
        <Modal state={modalState} className="modal-shaded">
            <div className="rounded-card delete-form">
                <h3>Удаление организации</h3>
                { organization && <div>{`Вы уверены, что хотите удалить организацию ${organization.organizationName}?`}</div> }
                <div>
                    <span className="outline-button" onClick={onCancelButtonClick}>Отмена</span>
                    <Form submit={submit} />
                </div>
            </div>
        </Modal>
    )
}

export default DeleteOrganizationForm;