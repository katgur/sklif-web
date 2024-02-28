import { useEffect } from 'react';
import PopupContent from './PopupContent';

function Popup({ target, setTarget, children, position = 'center bottom' }) {
    useEffect(() => {
        const clear = (e) => {
            if (e.target == target) {
                return;
            }
            setTarget(null);
        }

        document.body.addEventListener('click', clear);

        return () => {
            document.body.removeEventListener('click', clear);
        }
    }, [target])

    useEffect(() => {
        const onResize = () => {
            setTarget(null);
        }

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, []);

    return target && <PopupContent targetRect={target.getBoundingClientRect()} position={position}>{children}</PopupContent>
}

export default Popup;