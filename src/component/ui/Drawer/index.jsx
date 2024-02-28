import React from "react";
import '../nullify.css';
import '../typography.css';
import '../index.css';
import style from './style.module.css'

function Drawer({ menu, logo }) {
    if (!menu) {
        return;
    }

    return (
        <aside className={`${style.wrapper} font__inter--sm`}>
            <a href="/">
                <img className={style.logo} src={logo} alt="Logo" />
            </a>
            <nav className={style.navigation}>
                <ul>
                    {
                        menu.map((item, index) => {
                            return (
                                <li key={index} className={style.section}>
                                    <details>
                                        <summary className={style.title}>
                                            {item.icon}
                                            {item.text}
                                        </summary>
                                    </details>
                                    <ul className={style.content}>
                                        {item.options.map((option, index) => {
                                            return (
                                                <li key={index} className={style.link}>
                                                    {option}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </aside>
    )
}

export default React.memo(Drawer);