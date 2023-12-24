import { useDispatch } from 'react-redux';
import Form from '../../component/ui/Form.jsx';
import { updateUserRole } from './usersSlice';
import useUser from '../../hook/useUser';

function EditUserRoleForm({ isGlobal }) {
    const dispatch = useDispatch();
    const user = useUser();

    const globalOptions = ["Врач", "Администратор", "Глобальный администратор"];
    const localOptions = ["Врач", "Администратор"];

    const fields = [
        {
            section: "Изменение прав доступа",
            fields: [
                {
                    name: "role", text: "", type: "radio", style: "filled-radio", options: isGlobal ? globalOptions : localOptions, required: true
                },
            ]
        }
    ];

    const submitAction = (data) => {
        dispatch(updateUserRole({ previousRole: user.role, newRole: data.role, email: user.email }));
    }

    const submit = {
        text: "Изменить", style: "filled-button", action: submitAction
    }

    return (
        <Form fields={fields} submit={submit} entity={user} />
    )
}

export default EditUserRoleForm;