import { useContext } from "react";
import CampesinoContext from "../context/campesinosProvider";

const useCampesinos = () => {
    return useContext(CampesinoContext)
}

export default useCampesinos