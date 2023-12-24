import { useDispatch } from 'react-redux';
import Form from '../../component/ui/Form.jsx';
import { updateUserEmail } from './usersSlice';
import useUser from '../../hook/useUser';

const fields = [
    {
        section: "Привязка почты",
        columnNumber: 1,
        fields: [
            {
                name: "email", text: "Новая почта", type: "email", style: "filled-input", required: true
            },
        ]
    }
];

function EditUserEmailForm() {
    const dispatch = useDispatch();
    const user = useUser();

    const submitAction = (data) => {
        dispatch(updateUserEmail({ previousEmail: user.email, newEmail: data.email }));
    }

    const submit = {
        text: "Изменить", style: "filled-button", action: submitAction
    }

    return (
        <Form fields={fields} submit={submit} />
    )
}

export default EditUserEmailForm;