import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './page/LoginPage.jsx';
import RedirectPage from './page/RedirectPage.jsx';
import AuthorizedPage from './page/AuthorizedPage.jsx';
import { Provider } from 'react-redux';
import store from './store';
import NotFoundPage from './page/ui/NotFoundPage.jsx';
import Notifications from './feature/notification/Notifications.jsx';
import ServerLoginPage from './component/mock/ServerLoginPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/redirect' element={<RedirectPage />} />
          <Route path='/home/*' element={<AuthorizedPage />} />
          <Route path='/oauth2/authorize' element={<ServerLoginPage />} />
          <Route path='*' element={<NotFoundPage link={<Link to='/home'>Вернуться на главную</Link>} />} />
        </Routes>
        <Notifications />
      </Router>
    </Provider>
  );
}

export default App;
