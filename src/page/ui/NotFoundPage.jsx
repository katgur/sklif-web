import React from 'react'

function NotFoundPage({ link }) {
    return (
        <div className="not-found-page">
            <h2>Страница не найдена</h2>
            <p className="text-font">
                Страница, которую вы ищете, перемещена, удалена или не существует.
            </p>
            <div className="filled-button">
                {link}
            </div>
        </div>
    )
}

export default NotFoundPage;