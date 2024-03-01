import { Form, Modal, Card } from 'tailwind-admin';
import useApiDispatch from "../../hook/useApiDispatch.js";
import { deleteOrganization } from './orgSlice';
import useOrganization from '../../hook/useOrganization';
import { useNavigate, useParams } from 'react-router';

function DeleteOrganizationForm() {
    const dispatch = useApiDispatch();
    const navigate = useNavigate();
    const { email } = useParams();
    const organization = useOrganization(email);

    if (!organization) {
        return;
    }

    const onCancel = () => {
        navigate(-1);
    }

    const onSubmit = () => {
        dispatch(deleteOrganization(organization.email));
        onCancel();
    }

    return (
        <Modal isVisible={true} onClose={onCancel}>
            <Card>
                <Form
                    title={`Вы уверены, что хотите удалить данные организации ${organization.name}?`}
                    onSubmit={onSubmit}
                    onCancel={onCancel} />
            </Card>
        </Modal>
    )
}

export default DeleteOrganizationForm;