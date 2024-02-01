import Form from '../../component/ui/Form';
import { setMessage, selectData } from '../authSlice';
import { setPassword } from './usersSlice';
import { useDispatch, useSelector } from 'react-redux';

const fields = [
    {
        section: "Смена пароля",
        columnNumber: 1,
        fields: [
            {
                name: "password", text: "Новый пароль", type: "password", style: "filled-input", required: true
            },
            {
                name: "repeatedPassword", text: "Повторите пароль", type: "password", style: "filled-input", required: true
            }
        ]
    }
]

function EditPasswordForm() {
    const dispatch = useDispatch();
    const data = useSelector(selectData);

    const submitAction = ({ password, repeatedPassword }) => {
        if (password !== repeatedPassword) {
            dispatch(setMessage({ code: 0, message: "Введенные пароли не совпадают" }));
            return;
        } else if (data) {
            dispatch(setPassword({ email: data.email, password: password }));
        }
    }
    const submit = { text: "Готово", style: "filled-button", action: submitAction }

    return (
        <Form fields={fields} submit={submit} />
    )
}

export default EditPasswordForm;