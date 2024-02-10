import { useDispatch } from 'react-redux';
import Form from '../../component/ui/Form';
import useOrganization from '../../hook/useOrganization';
import { updateOrganization } from '../../feature/org/orgSlice';
import Input from '../../component/ui/Form/Input.jsx';

var mapToUpdateOrganization = (data) => {
    data.name = null;
    data.phoneNumber = null;
    data.administratorFirstName = null;
    data.administratorLastName = null;
    data.administratorPatronymic = null;
    data.address = null;
    return data;
}

function EditOrganizationEmailForm() {
    const dispatch = useDispatch();
    const organization = useOrganization();

    const onSubmit = (data) => {
        var query = mapToUpdateOrganization(data);
        dispatch(updateOrganization({ organization: query, email: organization.email }));
    }

    const fields = [
        {
            name: "email", text: "Новая почта", type: "email", required: true
        },
    ]

    return (
        <Form onSubmit={onSubmit}>
            <Input field={fields[0]}></Input>
        </Form>
    )
}

export default EditOrganizationEmailForm;