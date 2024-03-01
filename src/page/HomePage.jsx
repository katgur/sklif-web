import { Outlet } from 'react-router';
import { DrawerLayout } from 'tailwind-admin';
import logo from '../assets/logo.svg'
import useUser from '../hook/useUser';
import useAuth from '../hook/useAuth';
import { useNavigate } from "react-router";

function HomePage({ headerMenu, drawerMenu }) {
    const auth = useAuth();
    const user = useUser(auth && auth.email);
    const navigate = useNavigate();

    if (!user) {
        return;
    }

    const onSearchClick = (filter) => {
        navigate(`/home/search/${filter}`);
    }

    return (
        <DrawerLayout user={user} headerMenu={[]} drawerMenu={drawerMenu} onSearchClick={onSearchClick} logo={logo}>
            <Outlet />
        </DrawerLayout>
    )
}

export default HomePage;