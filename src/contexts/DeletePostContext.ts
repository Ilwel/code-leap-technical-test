import { createContext } from "react";
import { ModalOpenContextType } from "../types/ModalOpenContextType";

const DeletePostContext = createContext<ModalOpenContextType | null>(null)

export default DeletePostContext