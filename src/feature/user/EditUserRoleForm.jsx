import { Form, Radio, RadioGroup } from 'tailwind-admin';
import { updateUserRole } from './usersSlice';
import useUser from '../../hook/useUser';
import { useParams } from 'react-router';
import useApiDispatch from "../../hook/useApiDispatch.js";

const fields = [
    {
        name: "role", text: "Новая роль", type: "radio", required: true
    },
]

function EditUserRoleForm({ isGlobal }) {
    const dispatch = useApiDispatch();
    const { email } = useParams();
    const user = useUser(email);

    if (!user) {
        return;
    }

    const options = isGlobal ? ["Врач", "Администратор", "Глобальный администратор"] : ["Врач", "Администратор"];

    const onSubmit = (data) => {
        dispatch(updateUserRole(user.email, data.role));
    }

    return (
        <Form onSubmit={onSubmit} entity={user}>
            <RadioGroup field={fields[0]}>
                {
                    options.map(option => <Radio key={option}>{option}</Radio>)
                }
            </RadioGroup>
        </Form>
    )
}

export default EditUserRoleForm;