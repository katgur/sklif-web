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
import NotFoundPage from '../page/NotFoundPage.jsx';
import ProfileIcon from '../assets/profile.svg?react';
import SettingsIcon from '../assets/settings.svg?react';
import DashboardIcon from '../assets/dashboard.svg?react';
import UsersIcon from '../assets/users.svg?react';
import StorageIcon from '../assets/storage.svg?react';
import Breadcrumbs from '../component/ui/Breadcrumbs/index.jsx';
import FileStatistics from '../component/ui/FileStatistics/index.jsx';
import ActivityChart from '../feature/dashboard/ActivityChart.jsx';
import SpaceChart from '../feature/dashboard/SpaceChart.jsx';
import AvailableChart from '../feature/dashboard/AvailableChart.jsx';
import GridLayout from '../component/ui/GridLayout/index.jsx';
import GridCell from '../component/ui/GridLayout/GridCell.jsx';

const drawerMenu = [
  {
    text: "Пользователи", icon: <UsersIcon />, options: [
      <Link to="/home/users">Список</Link>,
      <Link to="/home/add_user">Добавить</Link>,
    ]
  },
  {
    text: "Хранилище", icon: <StorageIcon />, options: [
      <Link to="/home/files">Список</Link>,
      <Link to="/home/add_file">Загрузить</Link>,
    ]
  },
  {
    text: "Статистика", icon: <DashboardIcon />, options: [
      <Link to="/home/dashboard">Менеджер файлов</Link>,
    ]
  },
  {
    text: "Профиль", icon: <ProfileIcon />, options: [
      <Link to="/home/profile">Перейти</Link>,
      <Link to="/home/settings">Редактировать</Link>,
      <Link to="/logout">Выйти</Link>,
    ]
  },
  {
    text: "Настройки", icon: <SettingsIcon />, options: [
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

const dashboard = (
  <>
    <Breadcrumbs title='Статистика'>
      <Link to={''}>Менеджер файлов</Link>
    </Breadcrumbs>
    <GridLayout areas={`'files files files' 'activity activity space' 'activity activity available'`}>
      <GridCell area="files">
        <FileStatistics />
      </GridCell>
      <GridCell area="activity">
        <ActivityChart />
      </GridCell>
      <GridCell area="space">
        <SpaceChart />
      </GridCell>
      <GridCell area="available">
        <AvailableChart />
      </GridCell>
    </GridLayout>
  </>
)

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={homePage}>
          <Route path="dashboard" element={dashboard} />
          <Route path="users" element={usersListPage}>
            <Route path="search/:search" />
          </Route>
          <Route path="add_user" element={addUserPage} />
          <Route path="edit_user/:email" element={editUserPage} />
          <Route path="delete_user/:email" element={<DeleteUserForm />} />

          <Route path="files" element={filesPage} />
          <Route path="add_file" element={uploadFilePage} />
          <Route path="add_directory" element={addDirectoryPage} />
          <Route path="delete_file/*" element={<DeleteFileForm />} />

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
