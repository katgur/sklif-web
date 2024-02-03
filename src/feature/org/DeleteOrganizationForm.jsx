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
    const [modalState, setModalState] = useState({ enabled: true, coords: { top: 0, left: 0 } });
    const organization = useOrganization();

    const onCancel = () => {
        console.log('kek')
        navigate(-1);
        setModalState({
            enabled: false,
            coords: {}
        })
    }

    const onSubmit = () => {
        dispatch(removeOrganization({ organizationName: organization.organizationName }));
        onCancel();
    }

    return (
        // <Modal state={modalState} className="modal-shaded">
        <Form onSubmit={onSubmit} onCalcel={onCancel}>
            <h1>Удаление организации</h1>
            {organization && <div>{`Вы уверены, что хотите удалить организацию ${organization.organizationName}?`}</div>}
        </Form>
        // </Modal>
    )
}

export default DeleteOrganizationForm;