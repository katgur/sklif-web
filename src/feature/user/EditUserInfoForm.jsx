import { useDispatch } from 'react-redux';
import Form from '../../component/ui/Form';
import { updateUserInfo } from './usersSlice';
import useUser from '../../hook/useUser';
import TwoColumnLayout from '../../component/ui/Form/TwoColumnLayout';
import Input from '../../component/ui/Form/Input';
import { useParams } from 'react-router';

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
    const dispatch = useDispatch();
    const params = useParams();
    const user = useUser(params.email);

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