import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './page/LoginPage.jsx';
import RedirectPage from './page/RedirectPage.jsx';
import AuthorizedPage from './page/AuthorizedPage.jsx';
import { Provider } from 'react-redux';
import store from './store';
import NotFoundPage from './page/ui/NotFoundPage.jsx';
import RequestStatusHandler from './component/RequestStatusHandler.jsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/redirect' element={<RedirectPage />} />
          <Route path='/home/*' element={<AuthorizedPage />} />
          <Route path='*' element={<NotFoundPage link={<Link to='/home'>Вернуться на главную</Link>} />} />
        </Routes>
        <RequestStatusHandler />
      </Router>
    </Provider>
  );
}

export default App;
