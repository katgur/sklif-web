import React from 'react'
import './DrawerLayout.css'
import Drawer from '../Drawer';
import Header from '../Header';

function DrawerLayout({ drawerMenu, user, logo, children }) {

    return (
        <div className="layout">
            <div className='layout__drawer'>
                <Drawer menu={drawerMenu} logo={logo} />
            </div>
            <Header user={user} />
            <main className='layout__content'>
                {children}
            </main>
        </div>
    )
}

export default DrawerLayout;