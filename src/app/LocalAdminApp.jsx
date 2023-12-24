import { Link, Routes, Route } from 'react-router-dom';
import UsersList from '../feature/user/UsersList';
import HomePage from '../page/HomePage.jsx';
import ProfileViewer from '../feature/user/ProfileViewer';
import EditPasswordForm from '../feature/user/EditPasswordForm';
import EditUserInfoForm from '../feature/user/EditUserInfoForm';
import EditUserRoleForm from '../feature/user/EditUserRoleForm';
import EditUserEmailForm from '../feature/user/EditUserEmail';
import RegisterUserForm from '../feature/user/RegisterUserForm';
import DeleteUserForm from '../feature/user/DeleteUserForm';
import UploadFileForm from '../feature/storage/UploadFileForm';
import DeleteFileForm from '../feature/storage/DeleteFileForm';
import FilesList from '../feature/storage/FilesList';
import ProgressBar from '../component/ui/ProgressBar';
import AddDirectoryForm from '../feature/storage/AddDirectoryForm';
import Welcome from '../component/Welcome';
import UploadAvatarForm from '../feature/user/UploadAvatarForm';
import TabLayout from '../component/ui/TabLayout';
import NotFoundPage from '../page/ui/NotFoundPage.jsx';
import { profileIcon, settingsIcon, usersIcon, viewUsersIcon, addUserIcon, storageIcon, uploadIcon } from '../res/svg';

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
              text: "Просмотреть всех", route: "/home/users", icon: viewUsersIcon
          },
          {
              text: "Добавить", route: "/home/add_user", icon: addUserIcon
          }
      ]
  },
  {
    text: "Хранилище", icon: storageIcon, options: [
      {
        text: "Просмотреть", icon: storageIcon, route: '/home/files',
      },
      {
        text: "Загрузить", icon: uploadIcon, route: '/home/add_file',
      }
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
      <EditUserRoleForm />
    </TabLayout>
  </>
)

var settingsPage = (
  <>
    <h3>Настройки профиля</h3>
    <TabLayout titles={["Фотография профиля", "Общая информация", "Пароль"]}>
      <UploadAvatarForm />
      <EditUserInfoForm />
      <EditPasswordForm />
    </TabLayout>
  </>
)

function App() {
  return (
    <>
        <Routes>
          <Route path="" element={homePage}>
            <Route path="" element={<Welcome />} />
            <Route path="users" element={<UsersList />}>
              <Route path="delete/:id" element={<DeleteUserForm />} />
              <Route path="search/:search" />
            </Route>
            <Route path="add_user" element={<RegisterUserForm isGlobal={false} />} />
            <Route path="edit_user/:id" element={editUserPage} />

            <Route path="files" element={<FilesList />}>
              <Route path="delete/*" element={<DeleteFileForm />} />
            </Route>
            <Route path="add_file" element={<UploadFileForm />} />
            <Route path="add_directory" element={<AddDirectoryForm />} />

            <Route path="profile/:id" element={<ProfileViewer searchable={true} />} />
            <Route path="profile" element={<ProfileViewer searchable={true} />} />
            <Route path="settings" element={settingsPage} />
          </Route>
          <Route path="*" element={<NotFoundPage link={<Link to='/home'>Вернуться на главную</Link>} />} />
        </Routes>
    </>
  );
}

export default App;
