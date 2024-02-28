import { Routes, Route } from 'react-router-dom';
import Viewer from '../feature/study/Viewer';
import StudiesList from '../feature/study/StudiesList';
import ProgressBar from '../component/ui/ProgressBar';
import ProfileViewer from '../feature/user/ProfileViewer';
import LinkProvider from '../feature/study/LinkProvider';
import UploadFileForm from '../feature/storage/UploadFileForm';
import StudyViewer from '../feature/study/StudyViewer';
import HomePage from '../page/HomePage.jsx';
import NotFoundPage from '../page/NotFoundPage.jsx';
import { Link } from 'react-router-dom';
import ProfileIcon from '../assets/profile.svg?react';
import StudyIcon from '../assets/study.svg?react';
import Breadcrumbs from '../component/ui/Breadcrumbs/index.jsx';
import useAuth from '../hook/useAuth.js';

import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import * as dicomParser from "dicom-parser";

function getBlobUrl(url) {
    const baseUrl = window.URL || window.webkitURL;
    const blob = new Blob([`importScripts('${url}')`], {
        type: "application/javascript"
    });

    return baseUrl.createObjectURL(blob);
}

let webWorkerUrl = getBlobUrl(
    "https://unpkg.com/cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderWebWorker.min.js"
);
let codecsUrl = getBlobUrl(
    "https://unpkg.com/cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderCodecs.js"
);

const config = {
    webWorkerPath: webWorkerUrl,
    taskConfiguration: {
        decodeTask: {
            codecsPath: codecsUrl
        }
    },
    startWebWorkersOnDemand: true,
};

const initCornerstone = (accessToken) => {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
    cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneWADOImageLoader.configure({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        }
    });
}

const drawerMenu = [
    {
        text: "Профиль", icon: <ProfileIcon />, options: [
            <Link to="/home/profile">Перейти</Link>,
            <Link to="/logout">Выйти</Link>,
        ]
    },
    {
        text: "Исследования", icon: <StudyIcon />, options: [
            <Link to="/home/studies">Список</Link>,
            <Link to="/home/upload">Загрузить</Link>,
        ]
    },
]

const homePage = (
    <>
        <ProgressBar />
        <HomePage drawerMenu={drawerMenu} />
    </>
)

const studiesPage = (
    <>
        <Breadcrumbs title='Исследования'>
            <Link to=''>Список</Link>
        </Breadcrumbs>
        <StudiesList />
    </>
)

const studyPage = (
    <>
        <Breadcrumbs title='Просмотр исследования'>
            <Link to='/home/studies'>Список</Link>
            <Link to=''>Просмотр</Link>
        </Breadcrumbs>
        <StudyViewer />
    </>
)

const uploadPage = (
    <>
        <Breadcrumbs title='Загрузка исследования'>
            <Link to='/home/studies'>Список</Link>
            <Link to=''>Загрузить</Link>
        </Breadcrumbs>
        <UploadFileForm />
    </>
)

const profilePage = (
    <>
        <Breadcrumbs title='Профиль'>
            <Link to=''>Просмотр</Link>
        </Breadcrumbs>
        <ProfileViewer searchable={false} />
    </>
)
function Client() {
    const auth = useAuth();

    if (!auth) {
        return;
    }

    initCornerstone(auth.accessToken);

    return (
        <Routes>
            <Route path="" element={homePage}>
                <Route path="studies" element={studiesPage}>
                    <Route path="search/:search" />
                </Route>
                <Route path="link/*" element={<LinkProvider />} />
                <Route path="profile" element={profilePage} />
                <Route path="upload" element={uploadPage} />
                <Route path="study/*" element={studyPage} />
            </Route>
            <Route path="viewer/*" element={<Viewer />} />
            <Route path="*" element={<NotFoundPage link={<Link to='/home'>Вернуться на главную</Link>} />} />
        </Routes>
    )
}

export default Client;