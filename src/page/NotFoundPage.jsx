function NotFoundPage({ link }) {
    return (
        <div>
            <h1>Страница не найдена</h1>
            <p>
                Страница, которую вы ищете, перемещена, удалена или не существует.
            </p>
            <div>
                {link}
            </div>
        </div>
    )
}

export default NotFoundPage;