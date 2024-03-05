import { useRef } from 'react';
import StackViewport from './StackViewport';
import Toolbar from './Toolbar';
import { useState } from 'react';
import Mask from '../mask/Mask';
import api from '../../api/mock/studyApi';
import useStudy from '../../hook/useStudy';
import SideStudyViewer from './SideStudyViewer';
import { Stack, ViewerLayout } from 'tailwind-admin';
import { useSelector } from 'react-redux';
import { selectResult } from '../mask/maskSlice';

function Viewer() {
    const key = window.location.href.split('viewer/')[1];
    const viewport = useRef();
    const study = useStudy(key);
    const [isOpen, setIsOpen] = useState({
        mask: false,
        drawer: false,
    });
    const [index, setIndex] = useState(0);
    const result = useSelector(selectResult);

    if (!study) {
        return;
    }

    const onBurgerClick = () => {
        setIsOpen({
            ...isOpen,
            drawer: !isOpen.drawer,
        })
    }

    const onMaskClick = () => {
        setIsOpen({
            ...isOpen,
            mask: !isOpen.mask,
        })
    }

    return (
        <ViewerLayout>
            <Toolbar viewport={viewport} onBurgerClick={onBurgerClick} onMaskClick={onMaskClick} />
            <Stack direction="horizontal" gap={0}>
                {isOpen.drawer && <SideStudyViewer study={study} index={index} volume={result.volume} />}
                <StackViewport viewport={viewport} index={index} setIndex={setIndex} imageIds={study.keys.map(key => 'wadouri:' + api.getBytes(key))} />
                {isOpen.mask && <Mask path={study.keys[index]} />}
            </Stack>
        </ViewerLayout>
    )
}

export default Viewer;