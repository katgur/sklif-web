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
import Welcome from '../component/Welcome';
import { profileIcon, settingsIcon, usersIcon, orgsIcon, viewUsersIcon, addUserIcon, addOrgIcon, viewOrgsIcon } from '../res/svg';
import TabLayout from '../component/ui/TabLayout';
import NotFoundPage from '../page/ui/NotFoundPage.jsx';

const headerMenu = [
  {
    text: "Профиль", icon: profileIcon, route: "/home/profile", hasNotification: false
  },
  {
    text: "Настройки", icon: settingsIcon, route: "/home/settings", hasNotification: false
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

var editUserPage = (
  <>
    <h3>Редактирование данных пользователя</h3>
    <ProfileViewer searchable={true} />
    <TabLayout titles={["Общая информация", "Фотография профиля", "Привязка почты", "Права доступа"]}>
      <EditUserInfoForm />
      <UploadAvatarForm />
      <EditUserEmailForm />
      <EditUserRoleForm isGlobal={true} />
    </TabLayout>
  </>
)

var settingsPage = (
  <>
    <h3>Настройки профиля</h3>
    <TabLayout titles={["Общая информация", "Фотография профиля", "Привязка почты", "Пароль"]}>
      <EditUserInfoForm />
      <UploadAvatarForm />
      <EditUserEmailForm />
      <EditPasswordForm />
    </TabLayout>
  </>
)

var addOrganizationPage = (
  <>
    <h3>Регистрация организации</h3>
    <div className="card">
      <OrganizationForm />
    </div>
  </>
)

var editOrganizationPage = (
  <>
    <h3>Редактирование организации</h3>
    <TabLayout titles={["Общая информация", "Привязка почты"]}>
      <OrganizationForm />
      <EditOrganizationEmailForm />
    </TabLayout>
  </>
)

var profileViewer = (
  <>
    <h3>Данные профиля</h3>
    <ProfileViewer searchable={true} />
  </>
)

function App() {
  return (
    <Routes>
      <Route path="" element={homePage}>
        <Route path="" element={<Welcome />} />
        <Route path="users" element={<UsersList isGlobal={true} />}>
          <Route path="delete/:id" element={<DeleteUserForm />} />
          <Route path="search/:search" />
        </Route>
        <Route path="add_user" element={<RegisterUserForm isGlobal={true} />} />
        <Route path="edit_user/:id" element={editUserPage} />

        <Route path="organizations" element={<OrganizationsList />}>
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
  );
}

export default App;
