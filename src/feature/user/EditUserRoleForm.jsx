import { useDispatch } from 'react-redux';
import Form from '../../component/ui/Form';
import { updateUserRole } from './usersSlice';
import useUser from '../../hook/useUser';
import RadioGroup from '../../component/ui/Form/RadioGroup';
import Radio from '../../component/ui/Form/Radio';

function EditUserRoleForm({ isGlobal }) {
    const dispatch = useDispatch();
    const user = useUser();

    const globalOptions = ["Врач", "Администратор", "Глобальный администратор"];
    const localOptions = ["Врач", "Администратор"];

    const onSubmit = (data) => {
        dispatch(updateUserRole({ previousRole: user.role, newRole: data.role, email: user.email }));
    }

    const fields = [
        {
            name: "role", text: "Новая роль", type: "radio", required: true
        },
    ]

    return (
        <Form onSubmit={onSubmit}>
            <RadioGroup field={fields[0]}>
                {
                    globalOptions.map(option => <Radio key={option}>{option}</Radio>)
                }
            </RadioGroup>
        </Form>
    )
}

export default EditUserRoleForm;