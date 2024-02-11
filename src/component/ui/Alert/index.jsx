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

function Alert({ content, type, onClose }) {
    var title = titleMap[type];
    var icon = iconMap[type];
    return (
        <div className={`alert alert--${type}`}>
            <div className='alert__content'>
                {icon}
                <div className='alert__text'>
                    <div className={`${type}-title`}>{title}</div>
                    <p className={`${type}-text`}>{content}</p>
                </div>
            </div>
            {
                onClose && <span className="alert__icon" onClick={onClose}>{closeIcon}</span>
            }
        </div>
    )
}

export default Alert