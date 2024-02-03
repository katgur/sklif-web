import { useDispatch } from 'react-redux';
import Form from '../../component/ui/Form';
import { selectStatus, updateUserInfo } from './usersSlice';
import useUser from '../../hook/useUser';
import useNavigateIfSuccess from '../../hook/useNavigateIfSuccess';
import TwoColumnLayout from '../../component/ui/Form/TwoColumnLayout';
import Input from '../../component/ui/Form/Input';

const updateUserInfoMapper = (data, isGlobal, user) => {
    if (!isGlobal) {
        data.organization = user.organization;
    }
    return data;
}

function EditUserInfoForm({ isGlobal }) {
    const dispatch = useDispatch();
    const user = useUser();
    const navigateIfSuccess = useNavigateIfSuccess({ to: '/home/users', select: selectStatus });

    navigateIfSuccess();

    const onSubmit = (data) => {
        var query = updateUserInfoMapper(data, isGlobal, user);
        dispatch(updateUserInfo({ userInfo: query, email: user.email }));
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

    return (
        <Form onSubmit={onSubmit}>
            <TwoColumnLayout>
                {
                    fields.map(field => <Input key={field.name} field={field} />)
                }
            </TwoColumnLayout>
        </Form>
    )
}

export default EditUserInfoForm;