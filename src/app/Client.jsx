import { Routes, Route, Outlet } from 'react-router-dom';
import Viewer from '../feature/study/Viewer';
import StudiesList from '../feature/study/StudiesList';
import ProgressBar from '../component/ui/ProgressBar';
import ProfileViewer from '../feature/user/ProfileViewer';
import LinkProvider from '../feature/study/LinkProvider';
import UploadFileForm from '../feature/storage/UploadFileForm';
import StudyViewer from '../feature/study/StudyViewer';
import Welcome from '../component/Welcome';
import Header from '../component/ui/Header';
import { profileIcon, studyIcon } from '../res/svg';

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

const headerMenu = [
    {
        text: "Профиль", icon: profileIcon, route: "/home/profile", hasNotification: false
    },
    {
        text: "Исследования", icon: studyIcon, route: "/home/studies", hasNotification: false
    }
]

const homePage = (
    <>
        <ProgressBar />
        <Header avatarUrl="https://pasrc.princeton.edu/sites/g/files/toruqf431/files/styles/3x4_750w_1000h/public/2021-03/blank-profile-picture_0.jpg?itok=YcR6ckN3" menu={headerMenu} />
        <div className="basic-layout__content">
            <Outlet />
        </div>
    </>
)


function Client({ accessToken }) {
    initCornerstone(accessToken);

    return (
        <Routes>
            <Route path="" element={homePage}>
                <Route path="" element={<Welcome />} />
                <Route path="studies" element={<StudiesList />}>
                    <Route path="search/:search" />
                </Route>
                <Route path="link/*" element={<LinkProvider />} />
                <Route path="profile" element={<ProfileViewer searchable={false} />} />
                <Route path="upload" element={<UploadFileForm />} />
                <Route path="study/*" element={<StudyViewer />} />
            </Route>
            <Route path="viewer/*" element={<Viewer />} />
        </Routes>
    )
}

export default Client;