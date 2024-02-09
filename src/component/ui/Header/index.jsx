import React from 'react'
import { useState } from 'react'
import './Header.css'
import SearchBar from './SearchBar.jsx';
import Popup from '../Popup';

function Header({ user, onSearchClick, onLogoutButtonClick }) {
    const [target, setTarget] = useState(null);

    const onProfileIconClick = (e) => {
        setTarget(target ? null : e.target);
    }

    return (
        <header>
            <div className='header__user'>
                <p className='header__user-name'>
                    <span className='header__title font__nunito--sm'>
                        {user.name}
                    </span>
                    <span className='header__subtitle font__nunito--sm'>
                        {user.role}
                    </span>
                </p>
                <span onClick={onProfileIconClick}>
                    <img src={user.avatarURL} className="header__avatar" alt="Avatar" />
                </span>
            </div>
            <SearchBar onSearchClick={onSearchClick} />
            <Popup target={target} setTarget={setTarget} position="center bottom">
                <ul className='header__popup header__text font__inter--sm'>
                    <li className='header__item'>Профиль</li>
                    <li className='header__item header__dangerous' onClick={onLogoutButtonClick}>Выход</li>
                </ul>
            </Popup>
        </header>
    );
}

export default Header;
