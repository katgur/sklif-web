import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthUser from '../../hook/useAuthUser';
import Modal from './Modal';
import { protocol, serverUrl } from '../../util/config';
import useWindowSize from '../../hook/useWindowSize';

const burgerIcon = (
    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18L20 18" stroke="#333A48" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 12L20 12" stroke="#333A48" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 6L20 6" stroke="#333A48" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const maximized = (menu, avatarUrl, onProfileIconClick, modalState, onLogoutButtonClick) => (
    <>
        {menu &&
            <>
                <menu>
                    {
                        menu.map((option) => {
                            return (
                                <li key={option.text}>
                                    {option.hasNotification &&
                                        <span className="notificated-icon"></span>
                                    }
                                    <div key={option.text}>
                                        <Link to={option.route}>
                                            {option.icon}
                                        </Link>
                                    </div>
                                </li>
                            )
                        })
                    }
                </menu>
                <img onClick={onProfileIconClick} src={avatarUrl} className="header-avatar" alt="avatar" />
                <Modal state={modalState} className="header-context-menu">
                    <li onClick={onLogoutButtonClick}>Выход</li>
                </Modal>
            </>
        }
    </>
)


const minimized = (menu, onMenuClick) => (
    <>
        {menu &&
            <div onClick={(e) => onMenuClick(e)} className="basic-button">
                {burgerIcon}
            </div>
        }
    </>
)

function Header({ menu, className }) {
    const defaultAvatar = "https://pasrc.princeton.edu/sites/g/files/toruqf431/files/styles/3x4_750w_1000h/public/2021-03/blank-profile-picture_0.jpg?itok=YcR6ckN3"
    const user = useAuthUser();
    const [modalState, setModalState] = useState({ enabled: false });
    const [profileModalState, setProfileModalState] = useState({ enabled: false });
    const avatarUrl = (user && user.avatarURL) || defaultAvatar;
    const windowSize = useWindowSize();

    const onMenuClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        setModalState({
            enabled: !modalState.enabled,
            coords: {
                right: rect.width - rect.width / 2,
                top: rect.y + window.scrollY + rect.height
            }
        });
    }

    var onProfileIconClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        setProfileModalState(
            {
                coords: {
                    left: rect.x - (rect.width / 2),
                    top: rect.y + window.scrollY + rect.height
                },
                enabled: !profileModalState.enabled
            }
        )
    }

    var onModalClick = () => {
        setModalState({
            enabled: false,
            coords: {},
        })
    }

    var onLogoutButtonClick = () => {
        window.location.href = `${protocol}://${serverUrl}:8080/logout`;
    }

    return (
        <header className={className}>
            {windowSize && windowSize.width >= 800 && maximized(menu, avatarUrl, onProfileIconClick, profileModalState, onLogoutButtonClick)}
            {windowSize && windowSize.width < 800 && minimized(menu, onMenuClick)}
            <Modal state={modalState} className="header-context-menu">
                {
                    menu.map((option) => {
                        return (
                            <li onClick={onModalClick} key={option.text}>
                                {option.hasNotification && <span className="notificated-list"></span>}
                                <Link to={option.route}>{option.text}</Link>
                            </li>
                        )
                    })
                }
            </Modal>
        </header>
    );
}

export default Header;
