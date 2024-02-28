import { Outlet } from 'react-router';
import DrawerLayout from '../component/ui/DrawerLayout';
import logo from '../assets/logo.svg'
import useUser from '../hook/useUser';
import useAuth from '../hook/useAuth';

function HomePage({ drawerMenu }) {
    const auth = useAuth();
    const user = useUser(auth && auth.email);

    if (!user) {
        return;
    }

    return (
        <DrawerLayout user={user} drawerMenu={drawerMenu} logo={logo}>
            <Outlet />
        </DrawerLayout>
    )
}

export default HomePage;