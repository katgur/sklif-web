import Form from '../../component/ui/Form';
import { useDispatch } from 'react-redux';
import TwoColumnLayout from '../../component/ui/Form/TwoColumnLayout';
import Input from '../../component/ui/Form/Input.jsx';
import RadioGroup from '../../component/ui/Form/RadioGroup';
import Select from '../../component/ui/Form/Select'
import Radio from '../../component/ui/Form/Radio.jsx';
import useOrganizations from '../../hook/useOrganizations.js';
import { useParams } from 'react-router';
import useUser from '../../hook/useUser.js';

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
    const organizations = useOrganizations();
    const params = useParams();
    const user = useUser(params.email);

    const onSubmit = (data) => {
        dispatch(createUser(data));
    }

    return (
        <Form onSubmit={onSubmit} entity={user}>
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
            <Select field={{ required: true, name: "organization", text: "Организация" }} options={organizations} />
            {
                fields.slice(4).map(field => {
                    return <Input key={field.name} field={field} />
                })
            }
        </Form>
    )
}

export default GlobalRegisterUserForm;