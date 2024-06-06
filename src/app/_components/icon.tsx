import { cloneElement } from "react";
import { type IconBaseProps } from "react-icons/lib";

export { FiX as DeleteIcon } from "react-icons/fi";
export { FiEdit as EditIcon } from "react-icons/fi";

export const Icon = ({ children }: IconBaseProps) => {
  return cloneElement(children!, {
    strokeWidth: "1.5",
  });
};
