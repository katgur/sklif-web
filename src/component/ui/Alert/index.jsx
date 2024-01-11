import React from 'react'
import { successIcon, errorIcon, notifyIcon, closeIcon } from '../../../res/svg';
import './Alert.css'

const titleMap = {
    'success': 'Успешно',
    'error': 'Ошибка',
    'notify': 'Внимание',
}

const iconMap = {
    'success': successIcon,
    'error': errorIcon,
    'notify': notifyIcon,
}

function Alert({ id, text, type, onClose }) {
    var title = titleMap[type];
    var icon = iconMap[type];
    return (
        <div className={`alert alert--${type}`}>
            <div className='alert__content'>
                {icon}
                <div className='alert__text'>
                    <div className={`${type}-title`}>{title}</div>
                    <p className={`${type}-text`}>{text}</p>
                </div>
            </div>
            <span className="alert__icon" onClick={() => { onClose(id) }}>{closeIcon}</span>
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