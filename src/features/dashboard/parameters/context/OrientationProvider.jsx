import { createContext, useState } from "react";

import axios from "@config/axios";

const OrientationContext = createContext();

export const OrientationProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [orientation, setOrientation] = useState({});
    const [orientations, setOrientations] = useState([]);

    const readOrientations = async () => {
        setLoading(true);

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2RjMzM3NWE4MTI1NDkyMDk3MTZiZCIsImlhdCI6MTY3NDQzMDE0MiwiZXhwIjoxNjc3MDIyMTQyfQ.11EcHxUJXedVbjv_CZouAqFNkaliksh6w87OXInd_BQ",
            },
        };

        try {
            const { data } = await axios.get("/orientation", config);

            setOrientations(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <OrientationContext.Provider
            value={{
                loading,
                setLoading,
                orientation,
                setOrientation,
                orientations,
                setOrientations,
                readOrientations,
            }}
        >
            {children}
        </OrientationContext.Provider>
    );
};

export default OrientationContext;
