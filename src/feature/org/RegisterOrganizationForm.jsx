import { Form, Input, TwoColumnLayout, Card } from 'tailwind-admin';
import { addOrganization } from './orgSlice.js';
import { joinAdminFullName } from '../../util/mapper.js';
import { addError } from '../notification/notificationSlice.js';
import { useDispatch } from "react-redux";
import useApiDispatch from "../../hook/useApiDispatch.js";
import { useNavigate } from 'react-router';

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
        name: "address", text: "Адрес", type: "text"
    },
    {
        name: "phoneNumber", text: "Номер телефона", type: "phoneNumber"
    },
    {
        name: "email", text: "Почта", type: "email", required: true
    },
    {
        name: "password", text: "Пароль", type: "password", required: true
    },
    {
        name: "repeatPassword", text: "Повторите пароль", type: "password", required: true
    },
]

function RegisterOrganizationForm() {
    const dispatch = useDispatch();
    const apiDispatch = useApiDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (data.password !== data.repeatPassword) {
            dispatch(addError("Введенные пароли не совпадают, попробуйте снова"));
            return;
        }
        delete data.repeatPassword;
        const isSuccess = await apiDispatch(addOrganization(joinAdminFullName(data)));
        if (isSuccess) {
            navigate("/home/success/org");
        }
    }

    return (
        <Card>
            <Form onSubmit={onSubmit}>
                <TwoColumnLayout>
                    {
                        fields.slice(0, 6).map(field => {
                            return <Input key={field.name} field={field} />
                        })
                    }
                </TwoColumnLayout>
                {
                    fields.slice(6).map(field => {
                        return <Input key={field.name} field={field} />
                    })
                }
            </Form>
        </Card>
    )
}

export default RegisterOrganizationForm;