import { useState, useEffect } from 'react';

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const updateSize = () => {
            const newWidth = window.innerWidth;
            if (width !== newWidth) {
                setWidth(newWidth);
            }
        }

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [width])

    return width;
}

export default useWindowWidth;