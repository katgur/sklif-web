import Form from '../../component/ui/Form/index.jsx';
import Input from '../../component/ui/Form/Input.jsx';
import { useDispatch } from 'react-redux';
import { addOrganization } from './orgSlice.js';
import TwoColumnLayout from '../../component/ui/Form/TwoColumnLayout.jsx';

function RegisterOrganizationForm() {
    const dispatch = useDispatch();
    const fields = [
        {
            name: "organizationName", text: "Название", type: "text", required: true
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
        {
            name: "email", text: "Почта", type: "email", required: true
        },
        {
            name: "password", text: "Пароль", type: "password", required: true
        },
        {
            name: "passwordRepeat", text: "Повторите пароль", type: "password", required: true
        },
    ]

    const onSubmit = (data) => {
        dispatch(addOrganization(data));
    }

    return (
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
    )
}

export default RegisterOrganizationForm;