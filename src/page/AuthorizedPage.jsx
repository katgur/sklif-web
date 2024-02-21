import GlobalAdmin from '../app/GlobalAdminApp.jsx';
import LocalAdmin from '../app/LocalAdminApp.jsx';
import Client from '../app/Client.jsx';
import useAuth from '../hook/useAuth.js';

function AuthorizedPage() {
    const auth = useAuth();

    return (
        <>
            {auth && auth.authorities === "ADMIN_GLOBAL" && <GlobalAdmin />}
            {auth && auth.authorities === "ADMIN_LOCAL" && <LocalAdmin />}
            {auth && auth.authorities === "DOCTOR" && <Client />}
        </>
    )
}

export default AuthorizedPage;