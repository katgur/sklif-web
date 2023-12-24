import { useDispatch } from 'react-redux';
import Form from '../../component/ui/Form.jsx';
import { selectStatus, updateUserInfo } from './usersSlice';
import useUser from '../../hook/useUser';
import useNavigateIfSuccess from '../../hook/useNavigateIfSuccess';

const fields = [
    {
        section: "Общая информация",
        columnNumber: 2,
        fields: [
            {
                name: "firstName", text: "Имя", type: "text", style: "filled-input", required: true
            },
            {
                name: "lastName", text: "Фамилия", type: "text", style: "filled-input", required: true
            },
            {
                name: "patronymic", text: "Отчество", type: "text", style: "filled-input", required: false
            },
            {
                name: "phoneNumber", text: "Номер телефона", type: "phoneNumber", style: "filled-input", required: true
            }
        ]
    }
];

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

    const submitAction = (data) => {
        var query = updateUserInfoMapper(data, isGlobal, user);
        dispatch(updateUserInfo({ userInfo: query, email: user.email }));
    }

    const submit = {
        text: "Изменить", type: "submit", style: "filled-button", action: submitAction
    }

    return (
        <Form fields={fields} submit={submit} entity={user} />
    )
}

export default EditUserInfoForm;