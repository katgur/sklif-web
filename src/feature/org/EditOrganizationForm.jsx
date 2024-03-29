import { Form, Input, TwoColumnLayout, Card } from 'tailwind-admin';
import useApiDispatch from "../../hook/useApiDispatch.js";
import { updateOrganization } from './orgSlice.js';
import { useParams } from 'react-router';
import useOrganization from '../../hook/useOrganization.js'
import { splitAdminFullName, joinAdminFullName } from '../../util/mapper.js';

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

function EditOrganizationForm() {
    const dispatch = useApiDispatch();
    const { email } = useParams();
    const organization = useOrganization(email);

    if (!organization) {
        return;
    }

    const onSubmit = (data) => {
        dispatch(updateOrganization(organization.email, joinAdminFullName(data)));
    }

    return (
        <Card>
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
        </Card>
    )
}

export default EditOrganizationForm;