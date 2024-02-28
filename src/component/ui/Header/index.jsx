import React from 'react'
import { useState } from 'react'
import style from './style.module.css'
import SearchBar from './SearchBar.jsx';
import Popup from '../Popup';

function Header({ user, onSearchClick, onLogoutButtonClick }) {
    const [target, setTarget] = useState(null);

    const onProfileIconClick = (e) => {
        setTarget(target ? null : e.target);
    }

    return (
        <header className={style.header}>
            <div className={style.user}>
                <p className={style.userName}>
                    <span className={`${style.title} font__nunito--sm`}>
                        {user.name}
                    </span>
                    <span className={`${style.subtitle} font__nunito--sm`}>
                        {user.role}
                    </span>
                </p>
                <span onClick={onProfileIconClick}>
                    <img src={user.avatarURL} className={style.avatar} alt="Avatar" />
                </span>
            </div>
            <SearchBar onSearchClick={onSearchClick} />
            <Popup target={target} setTarget={setTarget} position="center bottom">
                <ul className={`${style.popup} ${style.text} font__inter--sm`}>
                    <li className={style.item}>Профиль</li>
                    <li className={`${style.item} ${style.caution}`} onClick={onLogoutButtonClick}>Выход</li>
                </ul>
            </Popup>
        </header>
    );
}

export default Header;
