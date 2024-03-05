import useApiDispatch from "../../hook/useApiDispatch.js";
import { Form, Input, Card } from 'tailwind-admin';
import { updateUserEmail } from './usersSlice';
import useUser from '../../hook/useUser';
import useAuth from '../../hook/useAuth';
import { useParams } from 'react-router';

const fields = [
    {
        name: "email", text: "Новая почта", type: "email", required: true
    },
]

function EditUserEmailForm() {
    const dispatch = useApiDispatch();
    const { email } = useParams();
    const auth = useAuth();
    const user = useUser(email || auth.email);

    if (!user) {
        return;
    }

    const onSubmit = (data) => {
        dispatch(updateUserEmail(user.email, data.email));
    }

    return (
        <Card width="full">
            <Form onSubmit={onSubmit} entity={user}>
                <Input field={fields[0]} />
            </Form>
        </Card>
    )
}

export default EditUserEmailForm;