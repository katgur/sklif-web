import useApiDispatch from "../../hook/useApiDispatch.js";
import Form from '../../component/ui/Form';
import { updateUserEmail } from './usersSlice';
import useUser from '../../hook/useUser';
import Input from '../../component/ui/Form/Input';
import { useParams } from 'react-router';

const fields = [
    {
        name: "email", text: "Новая почта", type: "email", required: true
    },
]

function EditUserEmailForm() {
    const dispatch = useApiDispatch();
    const { email } = useParams();
    const user = useUser(email);

    if (!user) {
        return;
    }

    const onSubmit = (data) => {
        dispatch(updateUserEmail(user.email, data.email));
    }

    return (
        <Form onSubmit={onSubmit} entity={user}>
            <Input field={fields[0]} />
        </Form>
    )
}

export default EditUserEmailForm;