import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [state, setState] = useState({
        width: 0,
        height: 0,
        isResizing: false,
    });

    useEffect(() => {
        const updateSize = () => {
            setState((prevState) => ({
                width: window.innerWidth,
                height: window.innerHeight,
                isResizing:
                    prevState.width !== window.innerWidth ||
                    prevState.height !== window.innerHeight,
            }));
        };

        window.addEventListener("resize", updateSize);

        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        let timeoutId;

        if (state.isResizing) {
            timeoutId = setTimeout(() => {
                setState((prevState) => ({
                    ...prevState,
                    isResizing: false,
                }));
            }, 200);
        }

        return () => clearTimeout(timeoutId);
    }, [state.width, state.height]);

    return state;
};

export default useWindowSize;
