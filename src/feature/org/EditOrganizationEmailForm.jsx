import useApiDispatch from "../../hook/useApiDispatch.js";
import { Form, Input } from 'tailwind-admin';
import useOrganization from '../../hook/useOrganization';
import { updateOrganization } from '../../feature/org/orgSlice';
import { useParams } from 'react-router';

const fields = [
    {
        name: "email", text: "Новая почта", type: "email", required: true
    },
]

function EditOrganizationEmailForm() {
    const dispatch = useApiDispatch();
    const { email } = useParams();
    const organization = useOrganization(email);

    if (!organization) {
        return;
    }

    const onSubmit = (data) => {
        dispatch(updateOrganization(organization.email, data));
    }

    return (
        <Form onSubmit={onSubmit} entity={organization}>
            <Input field={fields[0]}></Input>
        </Form>
    )
}

export default EditOrganizationEmailForm;