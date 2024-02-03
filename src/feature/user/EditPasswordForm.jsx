import Form from '../../component/ui/Form';
import Input from '../../component/ui/Form/Input';
import { setMessage, selectData } from '../authSlice';
import { setPassword } from './usersSlice';
import { useDispatch, useSelector } from 'react-redux';

function EditPasswordForm() {
    const dispatch = useDispatch();
    const data = useSelector(selectData);

    const onSubmit = ({ password, repeatedPassword }) => {
        if (password !== repeatedPassword) {
            dispatch(setMessage({ code: 0, message: "Введенные пароли не совпадают" }));
            return;
        } else if (data) {
            dispatch(setPassword({ email: data.email, password: password }));
        }
    }

    const fields = [
        {
            name: "password", text: "Новый пароль", type: "password", required: true
        },
        {
            name: "repeatedPassword", text: "Повторите пароль", type: "password", required: true
        }
    ]

    return (
        <Form onSubmit={onSubmit}>
            {
                fields.map(field => <Input field={field} />)
            }
        </Form>
    )
}

export default EditPasswordForm;