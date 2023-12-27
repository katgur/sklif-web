import { Outlet } from 'react-router';
import BasicLayout from '../component/ui/BasicLayout.jsx';
import Drawer from '../component/ui/Drawer';
import Header from '../component/ui/Header';
import logo from '../res/Logo.svg'

function HomePage({ headerMenu, drawerMenu }) {
    const header = <Header menu={headerMenu} />
    const drawer = <Drawer key="drawer" menu={drawerMenu} logo={logo} />
    const content = <Outlet />

    return (
        <BasicLayout header={header} drawer={drawer} content={content} />
    )
}

export default HomePage;