import { Form, TwoColumnLayout, Input, Radio, RadioGroup } from 'tailwind-admin';
import { useDispatch } from 'react-redux';
import { addError } from '../notification/notificationSlice.js';
import { createUser } from './usersSlice.js';
import useApiDispatch from "../../hook/useApiDispatch.js";
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

function RegisterUserForm() {
    const dispatch = useDispatch();
    const apiDispatch = useApiDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (data.password !== data.repeatPassword) {
            dispatch(addError("Введенные пароли не совпадают, попробуйте снова"));
            return;
        }
        delete data.repeatPassword;
        const isSuccess = apiDispatch(createUser(data));
        if (isSuccess) {
            navigate("/home/success/user");
        }
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
            </RadioGroup>

            {
                fields.slice(4).map(field => {
                    return <Input key={field.name} field={field} />
                })
            }
        </Form>
    )
}

export default RegisterUserForm;