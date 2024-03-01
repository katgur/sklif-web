import { Form, Input, Card } from 'tailwind-admin';
import { selectData } from '../auth/authSlice';
import { setPassword } from './usersSlice';
import { useSelector } from 'react-redux';
import useApiDispatch from "../../hook/useApiDispatch.js";

function EditPasswordForm() {
    const dispatch = useApiDispatch();
    const data = useSelector(selectData);

    const onSubmit = ({ password, repeatedPassword }) => {
        if (password !== repeatedPassword) {
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
        <Card>
            <Form onSubmit={onSubmit}>
                {
                    fields.map(field => <Input field={field} />)
                }
            </Form>
        </Card>
    )
}

export default EditPasswordForm;