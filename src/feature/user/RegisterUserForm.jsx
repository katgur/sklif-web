import Form from '../../component/ui/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectStatus } from './usersSlice';
import useOrganizations from '../../hook/useOrganizations';
import useUser from '../../hook/useUser';
import TwoColumnLayout from '../../component/ui/Form/TwoColumnLayout';
import Input from '../../component/ui/Form/Input.jsx';
import RadioGroup from '../../component/ui/Form/RadioGroup';
import Select from '../../component/ui/Form/Select'
import Radio from '../../component/ui/Form/Radio.jsx';

function RegisterUserForm({ isGlobal }) {
    const dispatch = useDispatch();
    const organizations = ["Ромашка", "Romashka"]
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
        console.log(data)
        dispatch(addUser(data));
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

export default RegisterUserForm;