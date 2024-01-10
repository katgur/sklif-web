import React from 'react'
import { useState } from 'react'
import './Header.css'
import SearchBar from './SearchBar.jsx';
import Popup from '../Popup.jsx';

function Header({ user, onSearchClick, onLogoutButtonClick }) {
    const [popupPoint, setPopupPoint] = useState(null);

    const onProfileIconClick = (e) => {
        setPopupPoint(!popupPoint ? { x: e.target.getBoundingClientRect().left - e.target.getBoundingClientRect().width / 2, y: e.target.getBoundingClientRect().bottom } : null);
    }
    
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
                <span onClick={onProfileIconClick}>
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
