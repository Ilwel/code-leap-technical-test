import { createContext } from "react";
import { ModalOpenContextType } from "../types/ModalOpenContextType";

const EditPostContext = createContext<ModalOpenContextType | null>(null)

export default EditPostContext