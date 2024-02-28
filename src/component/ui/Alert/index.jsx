import React from 'react'
import SuccessIcon from './success.svg?react';
import ErrorIcon from './error.svg?react';
import NotifyIcon from './notify.svg?react';
import CloseIcon from './close.svg?react';
import style from './style.module.css'

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
        <div className={`${style.alert} ${style[type]} font__jost--sm font_color_text`}>
            <div className={style.content}>
                {icon}
                <article className={style.text}>
                    <h1 className={`font_color_${type} font__jost--sm`}>{title}</h1>
                    <p>{children}</p>
                </article>
            </div>
            {
                onClose && <span className={style.icon} onClick={onClose}><CloseIcon /></span>
            }
        </div>
    )
}

export default Alert