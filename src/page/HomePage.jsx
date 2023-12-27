import { Outlet } from 'react-router';
import BasicLayout from '../component/ui/BasicLayout.jsx';
import Drawer from '../component/ui/Drawer';
import Header from '../component/ui/Header.jsx';
import logo from '../res/Logo.svg'
import logoMinimized from '../res/Logo-minimized.svg'

function HomePage({ headerMenu, drawerMenu }) {
    const header = <Header menu={headerMenu} />
    const drawer = <Drawer key="drawer" menu={drawerMenu} logo={logo} logoMinimized={logoMinimized} />
    const content = <Outlet />

    return (
        <BasicLayout header={header} drawer={drawer} content={content} />
    )
}

export default HomePage;