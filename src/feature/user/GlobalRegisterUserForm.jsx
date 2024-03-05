import { Form, TwoColumnLayout, Input, RadioGroup, Radio, Select, Alert, Card } from 'tailwind-admin';
import { useDispatch } from 'react-redux';
import useApiDispatch from "../../hook/useApiDispatch.js";
import useOrganizations from '../../hook/useOrganizations.js';
import { createUser } from './usersSlice.js';
import { addError } from '../notification/notificationSlice.js';
import { useNavigate } from 'react-router';

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
    const navigate = useNavigate();

    if (!organizations) {
        return;
    }

    if (organizations.length === 0) {
        return <Alert type="error" content="Нельзя добавить пользователя, если список оранизаций пуст" />
    }

    const onSubmit = async (data) => {
        if (data.password !== data.repeatPassword) {
            dispatch(addError("Введенные пароли не совпадают, попробуйте снова"));
            return;
        }
        delete data.repeatPassword;
        const isSuccess = await apiDispatch(createUser(data));
        if (isSuccess) {
            navigate("/home/success/user");
        }
    }

    return (
        <Card>
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
        </Card>
    )
}

export default GlobalRegisterUserForm;