import GlobalAdmin from '../app/GlobalAdminApp.jsx';
import LocalAdmin from '../app/LocalAdminApp.jsx';
import Client from '../app/Client.jsx';
import useAuth from '../hook/useAuth.js';

function AuthorizedPage() {
    const auth = useAuth();

    if (!auth) {
        return;
    }

    return (
        <>
            {auth.authorities === "ADMIN_GLOBAL" && <GlobalAdmin />}
            {auth.authorities === "ADMIN_LOCAL" && <LocalAdmin />}
            {auth.authorities === "DOCTOR" && <Client />}
        </>
    )
}

export default AuthorizedPage;