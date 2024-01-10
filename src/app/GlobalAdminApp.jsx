import { Routes, Route, Link } from 'react-router-dom';
import HomePage from '../page/HomePage.jsx';
import UsersList from '../feature/user/UsersList';
import RegisterUserForm from '../feature/user/RegisterUserForm';
import OrganizationForm from '../feature/org/OrganizationForm';
import ProfileViewer from '../feature/user/ProfileViewer';
import EditPasswordForm from '../feature/user/EditPasswordForm';
import EditUserInfoForm from '../feature/user/EditUserInfoForm';
import EditUserRoleForm from '../feature/user/EditUserRoleForm';
import EditUserEmailForm from '../feature/user/EditUserEmail';
import DeleteUserForm from '../feature/user/DeleteUserForm';
import DeleteOrganizationForm from '../feature/org/DeleteOrganizationForm';
import OrganizationsList from '../feature/org/OrganizationsList';
import UploadAvatarForm from '../feature/user/UploadAvatarForm';
import EditOrganizationEmailForm from '../feature/org/EditOrganizationEmailForm';
import ProgressBar from '../component/ui/ProgressBar';
import { profileIcon, settingsIcon, usersIcon, orgsIcon } from '../res/svg';
import TabLayout from '../component/ui/TabLayout';
import NotFoundPage from '../page/ui/NotFoundPage.jsx';
import Breadcrumbs from '../component/ui/Breadcrumbs/index.jsx';

const headerMenu = [
  {
    text: "Профиль", icon: profileIcon, route: "/home/profile"
  },
  {
    text: "Настройки", icon: settingsIcon, route: "/home/settings"
  }
]

const drawerMenu = [
  {
    text: "Пользователи", icon: usersIcon, options: [
      {
        text: "Просмотреть всех", route: "/home/users"
      },
      {
        text: "Добавить", route: "/home/add_user"
      }
    ]
  },
  {
    text: "Организации", icon: orgsIcon, options: [
      {
        text: "Просмотреть все", route: "/home/organizations"
      },
      {
        text: "Добавить", route: "/home/add_organization",
      }
    ]
  },
  {
    text: "Профиль", icon: profileIcon, options: [
      {
        text: "Перейти", route: "/home/profile"
      },
      {
        text: "Редактировать", route: "/home/settings"
      },
      {
        text: "Выйти", route: "/logout"
      }
    ]
  },
  {
    text: "Настройки", icon: settingsIcon, options: [
      {
        text: "Профиль", route: "/home/settings"
      },
    ]
  }
]

const homePage = (
  <>
    <ProgressBar />
    <HomePage drawerMenu={drawerMenu} headerMenu={headerMenu} />
  </>
)

const organizationsPage = (
  <>
    <Breadcrumbs title={'Организации'}>
      <Link to={''}>Организации</Link>
    </Breadcrumbs>
    <OrganizationsList />
  </>
)
const addOrganizationPage = (
  <>
    <Breadcrumbs title={'Регистрация организации'}>
      <Link to={'/home/organizations'}>Организации</Link>
      <Link to={''}>Добавить</Link>
    </Breadcrumbs>
    <div className="card">
      <OrganizationForm />
    </div>
  </>
)

const editOrganizationPage = (
  <>
    <Breadcrumbs title={'Редактирование данных организации'}>
      <Link to={'/home/organizations'}>Организации</Link>
      <Link to={''}>Редактировать</Link>
    </Breadcrumbs>
    <TabLayout titles={["Общая информация", "Привязка почты"]}>
      <OrganizationForm />
      <EditOrganizationEmailForm />
    </TabLayout>
  </>
)

const profileViewer = (
  <>
    <Breadcrumbs title={'Данные профиля'}>
      <Link to={''}>Профиль</Link>
    </Breadcrumbs>
    <ProfileViewer searchable={true} />
  </>
)

const settingsPage = (
  <>
    <Breadcrumbs title={'Настройки профиля'}>
      <Link to={'/home/profile'}>Профиль</Link>
      <Link to={''}>Настройки</Link>
    </Breadcrumbs>
    <TabLayout titles={["Общая информация", "Фотография профиля", "Привязка почты", "Пароль"]}>
      <EditUserInfoForm />
      <UploadAvatarForm />
      <EditUserEmailForm />
      <EditPasswordForm />
    </TabLayout>
  </>
)

const usersListPage = (
  <>
    <Breadcrumbs title={'Пользователи'}>
      <Link to={''}>Пользователи</Link>
    </Breadcrumbs>
    <UsersList isGlobal={true} />
  </>
)

const addUserPage = (
  <>
    <Breadcrumbs title={'Регистрация пользователя'}>
      <Link to={'/home/users'}>Пользователи</Link>
      <Link to={''}>Добавить</Link>
    </Breadcrumbs>
    <RegisterUserForm isGlobal={true} />
  </>
)

const editUserPage = (
  <>
    <Breadcrumbs title={'Редактирование данных пользователя'}>
      <Link to={'/home/users'}>Пользователи</Link>
      <Link to={''}>Редактировать</Link>
    </Breadcrumbs>
    <ProfileViewer searchable={true} />
    <TabLayout titles={["Общая информация", "Фотография профиля", "Привязка почты", "Права доступа"]}>
      <EditUserInfoForm />
      <UploadAvatarForm />
      <EditUserEmailForm />
      <EditUserRoleForm isGlobal={true} />
    </TabLayout>
  </>
)

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={homePage}>
          <Route path="users" element={usersListPage}>
            <Route path="delete/:id" element={<DeleteUserForm />} />
            <Route path="search/:search" />
          </Route>
          <Route path="add_user" element={addUserPage} />
          <Route path="edit_user/:id" element={editUserPage} />

          <Route path="organizations" element={organizationsPage}>
            <Route path="delete/:id" element={<DeleteOrganizationForm />} />
            <Route path="search/:search" />
          </Route>
          <Route path="add_organization" element={addOrganizationPage} />
          <Route path="edit_organization/:id" element={editOrganizationPage} />

          <Route path="profile/:id" element={profileViewer} />
          <Route path="profile" element={profileViewer} />
          <Route path="settings" element={settingsPage} />
        </Route>
        <Route path="*" element={<NotFoundPage link={<Link to='/home'>Вернуться на главную</Link>} />} />
      </Routes>
    </>
  );
}

export default App;
