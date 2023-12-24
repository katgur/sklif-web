import { useState, useEffect } from 'react';

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});

    useEffect(() => {
        const updateSize = () => {
            const size = {width: window.innerWidth, height: window.innerHeight}
            if (windowSize.width !== size.width || windowSize.height !== size.height) {
                setWindowSize(size);
            }
        }

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [windowSize])

    return windowSize;
}

export default useWindowSize;