import { useDispatch } from 'react-redux';
import Form from '../../component/ui/Form';
import { updateUserRole } from './usersSlice';
import useUser from '../../hook/useUser';
import RadioGroup from '../../component/ui/Form/RadioGroup';
import Radio from '../../component/ui/Form/Radio';
import { useParams } from 'react-router';

const fields = [
    {
        name: "role", text: "Новая роль", type: "radio", required: true
    },
]

function EditUserRoleForm({ isGlobal }) {
    const dispatch = useDispatch();
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