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
      <Link to="/home/users">Список</Link>,
      <Link to="/home/add_user">Добавить</Link>,
    ]
  },
  {
    text: "Хранилище", icon: storageIcon, options: [
      <Link to="/home/files">Список</Link>,
      <Link to="/home/add_file">Заргузить</Link>,
    ]
  },
  {
    text: "Профиль", icon: profileIcon, options: [
      <Link to="/home/profile">Перейти</Link>,
      <Link to="/home/settings">Редактировать</Link>,
      <Link to="/logout">Выйти</Link>,
    ]
  },
  {
    text: "Настройки", icon: settingsIcon, options: [
      <Link to="/home/settings">Профиль</Link>,
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
    <Breadcrumbs title={'Редактирование данных пользователя'}>
      <Link to={'/home/users'}>Список</Link>
      <Link to={''}>Редактировать</Link>
    </Breadcrumbs>
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
            <Route path="search/:search" />
          </Route>
          <Route path="add_user" element={addUserPage} />
          <Route path="edit_user/:email" element={editUserPage} />
          <Route path="delete_user/:email" element={<DeleteUserForm />} />

          <Route path="files" element={filesPage}>
            <Route path="delete/*" element={<DeleteFileForm />} />
          </Route>
          <Route path="add_file" element={uploadFilePage} />
          <Route path="add_directory" element={addDirectoryPage} />

          <Route path="profile/:email" element={profileViewer} />
          <Route path="profile" element={profilePage} />
          <Route path="settings" element={settingsPage} />
        </Route>
        <Route path="*" element={<NotFoundPage link={<Link to='/home'>Вернуться на главную</Link>} />} />
      </Routes>
    </>
  );
}

export default App;
