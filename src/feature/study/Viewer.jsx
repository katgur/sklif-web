import { useRef } from 'react';
import StackViewport from './StackViewport';
import Toolbar from './Toolbar';
import { useState } from 'react';
import Mask from '../mask/Mask';
import api from '../../api/mock/studyApi';
import useStudy from '../../hook/useStudy';
import SideStudyViewer from './SideStudyViewer';
import Stack from '../../component/ui/Stack';
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
        <Stack direction="vertical">
            <Toolbar viewport={viewport} onBurgerClick={onBurgerClick} onMaskClick={onMaskClick} />
            <Stack>
                <StackViewport viewport={viewport} index={index} setIndex={setIndex} imageIds={study.keys.map(key => 'wadouri:' + api.getBytes(key))} />
                {isOpen.mask && <Mask path={study.keys[index]} />}
                {isOpen.drawer && <SideStudyViewer study={study} index={index} volume={result.volume} />}
            </Stack>
        </Stack>
    )
}

export default Viewer;