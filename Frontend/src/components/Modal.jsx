import React from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ children, onClose }) => {
  return (
    <div className="backdrop" onClick={onClose}>
      <dialog className="modal" open onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="close-button" onClick={onClose}>
          <MdClose style={{ color: "red" }} />
        </button>
      </dialog>
    </div>
  );
};

export default Modal;
