import { Form, TwoColumnLayout, Input, RadioGroup, Radio, Select, Alert } from 'tailwind-admin';
import { useDispatch } from 'react-redux';
import useApiDispatch from "../../hook/useApiDispatch.js";
import useOrganizations from '../../hook/useOrganizations.js';
import { createUser } from './usersSlice.js';
import { addError } from '../notification/notificationSlice.js';

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
        name: "email", text: "Почта", type: "email", required: true
    },
    {
        name: "password", text: "Пароль", type: "password", required: true
    },
    {
        name: "repeatPassword", text: "Повторите пароль", type: "password", required: true
    }
];

function GlobalRegisterUserForm() {
    const dispatch = useDispatch();
    const apiDispatch = useApiDispatch();
    const organizations = useOrganizations();

    if (!organizations) {
        return;
    }

    if (organizations.length === 0) {
        return <Alert type="error" content="Нельзя добавить пользователя, если список оранизаций пуст" />
    }

    const onSubmit = (data) => {
        if (data.password !== data.repeatPassword) {
            dispatch(addError("Введенные пароли не совпадают, попробуйте снова"));
            return;
        }
        delete data.repeatPassword;
        apiDispatch(createUser(data));
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
            <RadioGroup field={{ required: true, name: "role", text: "Роль" }}>
                <Radio>Врач</Radio>
                <Radio>Администратор</Radio>
                <Radio>Глобальный администратор</Radio>
            </RadioGroup>
            {
                organizations && <Select field={{ required: true, name: "organization", text: "Организация" }} options={organizations.map(org => org.name)} />
            }
            {
                fields.slice(4).map(field => {
                    return <Input key={field.name} field={field} />
                })
            }
        </Form>
    )
}

export default GlobalRegisterUserForm;