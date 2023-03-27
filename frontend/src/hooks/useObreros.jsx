import { useContext } from "react";
import ObreroContext from "../context/obrerosProvider";

const useObreros = () => {
    return useContext(ObreroContext)
}

export default useObreros