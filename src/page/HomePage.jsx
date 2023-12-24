import { Outlet } from 'react-router';
import BasicLayout from '../component/ui/BasicLayout.jsx';
import Drawer from '../component/ui/Drawer.jsx';
import Header from '../component/ui/Header.jsx';

function HomePage({ headerMenu, drawerMenu }) {
    const header = <Header menu={headerMenu} />
    const drawer = <Drawer key="drawer" menu={drawerMenu} />
    const content = <Outlet />

    return (
        <BasicLayout header={header} drawer={drawer} content={content} />
    )
}

export default HomePage;