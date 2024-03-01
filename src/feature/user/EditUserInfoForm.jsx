import { Form, TwoColumnLayout, Input } from 'tailwind-admin';
import { updateUserInfo } from './usersSlice';
import useUser from '../../hook/useUser';
import useAuth from '../../hook/useAuth';
import { useParams } from 'react-router';
import useApiDispatch from "../../hook/useApiDispatch.js";

const updateUserInfoMapper = (data, isGlobal, user) => {
    if (!isGlobal) {
        data.organization = user.organization;
    }
    return data;
}

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
    }
]

function EditUserInfoForm({ isGlobal }) {
    const dispatch = useApiDispatch();
    const { email } = useParams();
    const auth = useAuth();
    const user = useUser(email || auth.email);

    if (!user) {
        return;
    }

    const onSubmit = (data) => {
        dispatch(updateUserInfo(user.email, updateUserInfoMapper(data, isGlobal, user)));
    }

    return (
        <Form onSubmit={onSubmit} entity={user}>
            <TwoColumnLayout>
                {
                    fields.map(field => <Input key={field.name} field={field} />)
                }
            </TwoColumnLayout>
        </Form>
    )
}

export default EditUserInfoForm;