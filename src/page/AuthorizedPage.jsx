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
            {auth.authorities === "global.admin" && <GlobalAdmin />}
            {auth.authorities === "admin" && <LocalAdmin />}
            {auth.authorities === "doctor" && <Client />}
        </>
    )
}

export default AuthorizedPage;