import React from 'react'
import { useState } from 'react'
import './Header.css'
import SearchBar from './SearchBar.jsx';
import Popup from '../Popup.jsx';

const burgerIcon = (
    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18L20 18" stroke="#333A48" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 12L20 12" stroke="#333A48" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 6L20 6" stroke="#333A48" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

function Header({ user, onSearchClick, onLogoutButtonClick }) {
    const [popupPoint, setPopupPoint] = useState(null);

    return (
        <header>
            <div className='header__user'>
                <p className='header__user-name'>
                    <span className='header__title'>
                        {user.name}
                    </span>
                    <span className='header__subtitle'>
                        {user.role}
                    </span>
                </p>
                <span onClick={(e) => setPopupPoint(!popupPoint ? { x: e.target.getBoundingClientRect().left - e.target.getBoundingClientRect().width / 2, y: e.target.getBoundingClientRect().bottom } : null)}>
                    <img src={user.avatarURL} className="header__avatar" alt="Avatar" />
                </span>
            </div>
            <SearchBar onSearchClick={onSearchClick} />
            <Popup point={popupPoint}>
                <ul className='header__popup header__text'>
                    <li className='header__item'>Профиль</li>
                    <li className='header__item header__dangerous' onClick={onLogoutButtonClick}>Выход</li>
                </ul>
            </Popup>
        </header>
    );
}

export default Header;
