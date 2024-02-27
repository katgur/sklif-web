import Form from '../../component/ui/Form/index.jsx';
import Input from '../../component/ui/Form/Input.jsx';
import { useDispatch } from 'react-redux';
import { addOrganization } from './orgSlice.js';
import TwoColumnLayout from '../../component/ui/Form/TwoColumnLayout.jsx';
import { joinAdminFullName } from '../../util/mapper.js';
import { addError } from '../notification/notificationSlice.js';

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

    const onSubmit = (data) => {
        if (data.password !== data.repeatPassword) {
            dispatch(addError("Введенные пароли не совпадают, попробуйте снова"));
            return;
        }
        delete data.repeatPassword;
        dispatch(addOrganization(joinAdminFullName(data)));
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