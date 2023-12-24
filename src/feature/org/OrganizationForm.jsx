import Form from '../../component/ui/Form.jsx';
import { useDispatch } from 'react-redux';
import { addOrganization, updateOrganization, fetchOrganization, selectStatus } from './orgSlice';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import useNavigateIfSuccess from '../../hook/useNavigateIfSuccess';
import useOrganization from '../../hook/useOrganization';

const fields = [
    {
        section: "Общие данные",
        columnNumber: 2,
        fields: [
            {
                name: "organizationName", text: "Название", type: "text", style: "filled-input", required: true
            },
            {
                name: "administratorFirstName", text: "Имя администратора", type: "text", style: "filled-input", required: true
            },
            {
                name: "administratorLastName", text: "Фамилия администратора", type: "text", style: "filled-input", required: true
            },
            {
                name: "administratorPatronymic", text: "Отчество администратора", type: "text", style: "filled-input", required: false
            },

        ]
    },
    {
        section: "Контакты",
        columnNumber: 2,
        fields: [
            {
                name: "address", text: "Адрес", type: "text", style: "filled-input", required: true
            },
            {
                name: "phoneNumber", text: "Номер телефона", type: "phoneNumber", style: "filled-input", required: true
            },
        ]
    }
];

const authSection = {
    section: "Данные авторизации",
    columnNumber: 2,
    fields: [
        {
            name: "email", text: "Почта", type: "email", style: "filled-input", required: true
        },
        {
            name: "password", text: "Пароль", type: "password", style: "filled-input", required: true
        },
    ]
}

function OrganizationForm() {
    const organization = useOrganization();
    const dispatch = useDispatch();
    const params = useParams();
    const navigateIfSuccess = useNavigateIfSuccess({ to: '/home/organizations', select: selectStatus });

    navigateIfSuccess();
    useEffect(() => {
        if (params.id && !organization) {
            dispatch(fetchOrganization(params.id));
        }
    }, [params, dispatch, organization])

    const submitAction = async (data) => {
        if (!organization) {
            dispatch(addOrganization(data));
        } else {
            dispatch(updateOrganization({ organization: data, email: params.id }));
        }
    }

    var submitText = organization ? "Редактировать" : "Добавить";
    const submit = { text: submitText, style: "filled-button", action: submitAction }

    return (
        <>
            {organization && <Form fields={fields} submit={submit} entity={organization} />}
            {!organization && <Form fields={[...fields, authSection]} submit={submit} entity={organization} />}
        </>
    )
}

export default OrganizationForm;