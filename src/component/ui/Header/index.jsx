import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthUser from '../../../hook/useAuthUser';
import Modal from '../Modal';
import { protocol, serverUrl } from '../../../util/config';
import useWindowWidth from '../hook/useWindowSize';

const burgerIcon = (
    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18L20 18" stroke="#333A48" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 12L20 12" stroke="#333A48" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 6L20 6" stroke="#333A48" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const maximized = (menu, avatarUrl, onProfileIconClick, modalState, onLogoutButtonClick) => (
    <>

    </>
)

function Header() {
    const defaultAvatar = "https://pasrc.princeton.edu/sites/g/files/toruqf431/files/styles/3x4_750w_1000h/public/2021-03/blank-profile-picture_0.jpg?itok=YcR6ckN3"
    const user = useAuthUser();
    const [modalState, setModalState] = useState({ enabled: false });
    const [profileModalState, setProfileModalState] = useState({ enabled: false });
    const avatarUrl = (user && user.avatarURL) || defaultAvatar;
    const windowWidth = useWindowWidth();

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
        <header>
            <nav>
                <img onClick={onProfileIconClick} src={avatarUrl} className="header-avatar" alt="avatar" />

            </nav>
            <Modal state={modalState} className="header-context-menu">
                <li onClick={onLogoutButtonClick}>Выход</li>
            </Modal>
        </header>
    );
}

export default Header;
