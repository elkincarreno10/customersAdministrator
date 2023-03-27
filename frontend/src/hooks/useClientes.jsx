import { useContext } from "react";
import ClienteContext from "../context/clientesProvider";

const useClientes = () => {
    return useContext(ClienteContext)
}

export default useClientes