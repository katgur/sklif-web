import React from 'react'
import SuccessIcon from './success.svg?react';
import ErrorIcon from './error.svg?react';
import NotifyIcon from './notify.svg?react';
import CloseIcon from './close.svg?react';
import './Alert.css'

const titleMap = {
    'success': 'Успешно',
    'error': 'Ошибка',
    'notify': 'Внимание',
}

const iconMap = {
    'success': <SuccessIcon />,
    'error': <ErrorIcon />,
    'notify': <NotifyIcon />,
}

function Alert({ children, type, onClose }) {
    var title = titleMap[type];
    var icon = iconMap[type];
    return (
        <div className={`alert alert--${type}`}>
            <div className='alert__content'>
                {icon}
                <div className='alert__text'>
                    <div className={`${type}-title`}>{title}</div>
                    <p className={`${type}-text`}>{children}</p>
                </div>
            </div>
            {
                onClose && <span className="alert__icon" onClick={onClose}><CloseIcon /></span>
            }
        </div>
    )
}

export default Alert