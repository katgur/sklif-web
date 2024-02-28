import React from 'react'
import style from './style.module.css'
import Drawer from '../Drawer';
import Header from '../Header';

function DrawerLayout({ drawerMenu, user, logo, children }) {

    return (
        <div className={style.layout}>
            <div className={style.drawer}>
                <Drawer menu={drawerMenu} logo={logo} />
            </div>
            <Header user={user} />
            <main className={style.content}>
                {children}
            </main>
        </div>
    )
}

export default DrawerLayout;