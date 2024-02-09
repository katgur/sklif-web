import React from "react";
import './Drawer.css'

function Drawer({ menu, logo }) {
    if (!menu) {
        return;
    }

    return (
        <aside className="drawer">
            <img className="drawer__logo" src={logo} alt="Logo" />
            <nav className="drawer__navigation">
                <ul>
                    {
                        menu.map(item => {
                            return (
                                <li key={item.text} className="drawer__section">
                                    <details>
                                        <summary className="drawer__title">
                                            {item.icon}
                                            {item.text}
                                        </summary>
                                    </details>
                                    <ul className="drawer__content">
                                        {item.options.map(option => {
                                            return (
                                                <li key={option.text} className="drawer__link">
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