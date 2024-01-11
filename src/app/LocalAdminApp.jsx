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
import UploadAvatarForm from '../feature/user/UploadAvatarForm';
import TabLayout from '../component/ui/TabLayout';
import NotFoundPage from '../page/ui/NotFoundPage.jsx';
import { profileIcon, settingsIcon, usersIcon, storageIcon } from '../res/svg';
import Breadcrumbs from '../component/ui/Breadcrumbs/index.jsx';

const drawerMenu = [
  {
    text: "Пользователи", icon: usersIcon, options: [
      {
        text: "Список", route: "/home/users"
      },
      {
        text: "Добавить", route: "/home/add_user"
      }
    ]
  },
  {
    text: "Хранилище", icon: storageIcon, options: [
      {
        text: "Список", route: '/home/files',
      },
      {
        text: "Загрузить", route: '/home/add_file',
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
    <HomePage drawerMenu={drawerMenu} />
  </>
)

const profilePage = (
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
    <TabLayout titles={["Фотография профиля", "Общая информация", "Пароль"]}>
      <UploadAvatarForm />
      <EditUserInfoForm />
      <EditPasswordForm />
    </TabLayout>
  </>
)

const usersListPage = (
  <>
    <Breadcrumbs title={'Пользователи'}>
      <Link to={''}>Список</Link>
    </Breadcrumbs>
    <UsersList />
  </>
)

const addUserPage = (
  <>
    <Breadcrumbs title={'Регистрация пользователя'}>
      <Link to={'/home/users'}>Список</Link>
      <Link to={''}>Добавить</Link>
    </Breadcrumbs>
    <RegisterUserForm />
  </>
)

const editUserPage = (
  <>
    <Breadcrumbs title='Редактирование данных пользователя'>
      <Link to='/home/users'>Список</Link>
      <Link to=''>Редактировать</Link>
    </Breadcrumbs>
    <ProfileViewer searchable={true} />
    <TabLayout titles={["Общая информация", "Фотография профиля", "Привязка почты", "Права доступа"]}>
      <EditUserInfoForm />
      <UploadAvatarForm />
      <EditUserEmailForm />
      <EditUserRoleForm />
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

const filesPage = (
  <>
    <Breadcrumbs title={'Файлы'}>
      <Link to={''}>Список</Link>
    </Breadcrumbs>
    <FilesList />
  </>
)

const uploadFilePage = (
  <>
    <Breadcrumbs title={'Загрузка'}>
      <Link to={'/home/files'}>Список файлов</Link>
      <Link to={''}>Загрузить</Link>
    </Breadcrumbs>
    <UploadFileForm />
  </>
)

const addDirectoryPage = (
  <>
    <Breadcrumbs title={'Создание директории'}>
      <Link to={'/home/files'}>Список файлов</Link>
      <Link to={''}>Создать директорию</Link>
    </Breadcrumbs>
    <AddDirectoryForm />
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

          <Route path="files" element={filesPage}>
            <Route path="delete/*" element={<DeleteFileForm />} />
          </Route>
          <Route path="add_file" element={uploadFilePage} />
          <Route path="add_directory" element={addDirectoryPage} />

          <Route path="profile/:id" element={profileViewer} />
          <Route path="profile" element={profilePage} />
          <Route path="settings" element={settingsPage} />
        </Route>
        <Route path="*" element={<NotFoundPage link={<Link to='/home'>Вернуться на главную</Link>} />} />
      </Routes>
    </>
  );
}

export default App;
