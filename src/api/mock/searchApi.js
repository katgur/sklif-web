const search = (filter) => {
    return [
        {
            title: "Пользователи",
            data: [
                {
                    "email": "doctor@mail.com",
                    "firstName": "Врач",
                    "lastName": "Тестовый",
                    "patronymic": "",
                    "phoneNumber": "+7 (999) 123-45-67",
                    "role": "Врач",
                    "organization": "'ООО' Ромашка",
                },
            ],
        }
    ]
}

export default {
    search,
}