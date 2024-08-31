import { useState, useEffect } from "react";

const useLoged = () => {
    const [loged, setLoged] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("uuuu aaaaaa")) {
            setLoged(true);
        }
    }
        , []);

    const handleLoged = () => {
        setLoged(true);
        localStorage.setItem("uuuu aaaaaa", true);
    }

    const handleLogOut = () => {
        setLoged(false);
        localStorage.removeItem("uuuu aaaaaa");
    }

    return { loged, handleLoged, handleLogOut };
}

export default useLoged;