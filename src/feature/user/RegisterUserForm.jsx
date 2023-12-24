import Form from '../../component/ui/Form.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectStatus } from './usersSlice';
import useOrganizations from '../../hook/useOrganizations';
import useUser from '../../hook/useUser';

const fields = [
    {
        section: "Основные данные",
        columnNumber: 2,
        fields: [
            {
                name: "firstName", text: "Имя", type: "text", style: "filled-input", required: true
            },
            {
                name: "lastName", text: "Фамилия", type: "text", style: "filled-input", required: true
            },
            {
                name: "patronymic", text: "Отчество", type: "text", style: "filled-input", required: false
            },
            {
                name: "phoneNumber", text: "Номер телефона", type: "phoneNumber", style: "filled-input", required: true
            },
        ]
    },
    {
        section: "Данные авторизации",
        columnNumber: 2,
        fields: [
            {
                name: "email", text: "Почта", type: "email", style: "filled-input", required: true
            },
            {
                name: "password", text: "Пароль", type: "password", style: "filled-input", required: true
            }
        ]
    },
];

const globalOptions = ["Врач", "Администратор", "Глобальный администратор"];
const localOptions = ["Врач", "Администратор"];
const getAccessSection = (isGlobal, organizations) => {
    var roleField = {
        name: "role", text: "Роль", type: "radio", style: "filled-radio",
        required: true, options: isGlobal ? globalOptions : localOptions
    };
    var organizationField;
    if (organizations) {
        organizationField = {
            name: "organization", text: "Организация", type: "select",
            style: "filled-input", required: true,
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
    var status = useSelector(selectStatus);

    const submitAction = async (data) => {
        if (!isGlobal) {
            data.organization = user.organization;
        }
        dispatch(addUser(data));
    }

    const submit = { text: "Зарегистрировать", style: "filled-button", action: submitAction }

    return (
        <>
            {<h3>Регистрация пользователя</h3>}
            <div className="card">
                {
                    (!status.code || status.code === 200) &&
                    <Form fields={[...fields, getAccessSection(isGlobal, organizations)]} submit={submit} />
                }
            </div>
        </>
    )
}

export default RegisterUserForm;