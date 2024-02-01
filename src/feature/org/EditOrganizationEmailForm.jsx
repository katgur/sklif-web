import { useDispatch } from 'react-redux';
import Form from '../../component/ui/Form';
import useOrganization from '../../hook/useOrganization';
import { updateOrganization } from '../../feature/org/orgSlice';

const fields = [
    {
        section: "Введите новую почту для привязки",
        fields: [
            {
                name: "email", text: "Новая почта", type: "email", style: "filled-input", required: true
            },
        ]
    }
];

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

    const submitAction = (data) => {
        var query = mapToUpdateOrganization(data);
        dispatch(updateOrganization({ organization: query, email: organization.email }));
    }

    const submit = {
        text: "Изменить", style: "filled-button", action: submitAction
    }

    return (
        <Form fields={fields} submit={submit} />
    )
}

export default EditOrganizationEmailForm;