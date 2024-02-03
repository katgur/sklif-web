import { useDispatch } from 'react-redux';
import Form from '../../component/ui/Form';
import { updateUserEmail } from './usersSlice';
import useUser from '../../hook/useUser';
import Input from '../../component/ui/Form/Input';

function EditUserEmailForm() {
    const dispatch = useDispatch();
    const user = useUser();

    const onSubmit = (data) => {
        dispatch(updateUserEmail({ previousEmail: user.email, newEmail: data.email }));
    }

    const fields = [
        {
            name: "email", text: "Новая почта", type: "email", required: true
        },
    ]

    return (
        <Form onSubmit={onSubmit}>
            <Input field={fields[0]} />
        </Form>
    )
}

export default EditUserEmailForm;