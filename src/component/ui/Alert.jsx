import React from 'react'
import { successIcon, errorIcon, notifyIcon, closeIcon } from '../../res/svg';

var titleMap = {
    'success': 'Успешно',
    'error': 'Ошибка',
    'notify': 'Внимание',
}

var iconMap = {
    'success': successIcon,
    'error': errorIcon,
    'notify': notifyIcon,
}

function Alert({ id, text, type, onClose }) {
    var title = titleMap[type];
    var icon = iconMap[type];
    return (
        <div className={`alert alert-${type}`}>
            <div>
                <span>{icon}</span>
                <div>
                    <div className={`${type}-title`}>{title}</div>
                    <p className={`${type}-text`}>{text}</p>
                </div>
            </div>
            <span className="close-icon" onClick={() => { onClose(id) }}>{closeIcon}</span>
        </div>
    )
}

export const SuccessAlert = ({ id, text, onClose }) => {
    return <Alert id={id} text={text} type='success' onClose={onClose} />
}

export const ErrorAlert = ({ id, text, onClose  }) => {
    return <Alert id={id} text={text} type='error' onClose={onClose} />
}

export const NotifyAlert = ({ id, text, onClose }) => {
    return <Alert id={id} text={text} type='notify' onClose={onClose} />
}