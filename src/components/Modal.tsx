import ReactModal from "react-modal";
import "../styles/Modal.css";
import { ModalProps } from "../constants";
import { FaXmark } from "react-icons/fa6";

ReactModal.setAppElement("#root");

const Modal = ({ isOpen, onRequestClose, children }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      closeTimeoutMS={300}
    >
      <button className="close-button" onClick={onRequestClose}>
        <FaXmark style={{ color: "white" }} />
      </button>
      {children}
    </ReactModal>
  );
};

export default Modal;
