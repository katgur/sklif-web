import Form from '../../component/ui/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectStatus } from './usersSlice';
import useOrganizations from '../../hook/useOrganizations';
import useUser from '../../hook/useUser';
import TwoColumnLayout from '../../component/ui/Form/TwoColumnLayout';
import Input from '../../component/ui/Form/Input.jsx';

const globalOptions = ["Врач", "Администратор", "Глобальный администратор"];
const localOptions = ["Врач", "Администратор"];
const getAccessSection = (isGlobal, organizations) => {
    var organizationField;
    if (organizations) {
        organizationField = {
            name: "organization", text: "Организация", type: "select",
            required: true,
            options: organizations.map((org) => { return org.organizationName })
        }
    }

    return (organizationField) ?
        {
            section: "Права доступа",
            columnNumber: 1,
            fields: [organizationField, roleField],
        }
        : {
            section: "Права доступа",
            columnNumber: 1,
            fields: [roleField],
        }
}

function RegisterUserForm({ isGlobal }) {
    const dispatch = useDispatch();
    const organizations = useOrganizations(isGlobal);
    const user = useUser();

    const fields = [
        {
            name: "firstName", text: "Имя", type: "text", required: true
        },
        {
            name: "lastName", text: "Фамилия", type: "text", required: true
        },
        {
            name: "patronymic", text: "Отчество", type: "text", required: false
        },
        {
            name: "phoneNumber", text: "Номер телефона", type: "phoneNumber", required: true
        },
        {
            name: "role", text: "Роль", type: "radio", required: true
        },
        {
            name: "organization", text: "Организация", type: "select", required: true
        },
        {
            name: "email", text: "Почта", type: "email", required: true
        },
        {
            name: "password", text: "Пароль", type: "password", required: true
        },
        {
            name: "repeatPassword", text: "Повторите пароль", type: "password", required: true
        }
    ];

    const onSubmit = (data) => {
        if (!isGlobal) {
            data.organization = user.organization;
        }
        dispatch(addUser(data));
    }

    return (
        <Form onSubmit={onSubmit}>
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

export default RegisterUserForm;