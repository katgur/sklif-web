import Form from '../../component/ui/Form';
import Input from '../../component/ui/Form/Input.jsx';
import { useDispatch } from 'react-redux';
import { updateOrganization } from './orgSlice.js';
import TwoColumnLayout from '../../component/ui/Form/TwoColumnLayout.jsx';
import { useParams } from 'react-router';
import useOrganization from '../../hook/useOrganization.js'

const fields = [
    {
        name: "name", text: "Название", type: "text", required: true
    },
    {
        name: "administratorFirstName", text: "Имя администратора", type: "text", required: true
    },
    {
        name: "administratorLastName", text: "Фамилия администратора", type: "text", required: true
    },
    {
        name: "administratorPatronymic", text: "Отчество администратора", type: "text", required: false
    },
    {
        name: "address", text: "Адрес", type: "text", required: true
    },
    {
        name: "phoneNumber", text: "Номер телефона", type: "phoneNumber", required: true
    },
]

const splitAdminFullName = (org) => {
    const [administratorFirstName, administratorLastName, administratorPatronymic] = org.administratorFullName.split(" ");
    delete org.administratorFullName;
    return { ...org, administratorFirstName, administratorLastName, administratorPatronymic };
}

const joinAdminFullName = (org) => {
    const administratorFullName = `${org.administratorFirstName} ${org.administratorLastName} ${org.administratorPatronymic}`;
    delete org.administratorFirstName;
    delete org.administratorLastName;
    delete org.administratorPatronymic;
    return { ...org, administratorFullName };
}

function EditOrganizationForm() {
    const dispatch = useDispatch();
    const { email } = useParams();
    const organization = useOrganization(email);

    if (!organization) {
        return;
    }

    const onSubmit = (data) => {
        dispatch(updateOrganization(organization.email, joinAdminFullName(data)));
    }

    return (
        <Form onSubmit={onSubmit} entity={splitAdminFullName(organization)}>
            <TwoColumnLayout>
                {
                    fields.slice(0, 4).map(field => {
                        return <Input key={field.name} field={field} />
                    })
                }
            </TwoColumnLayout>
            {
                fields.slice(4).map(field => {
                    return <Input key={field.name} field={field} />
                })
            }
        </Form>
    )
}

export default EditOrganizationForm;