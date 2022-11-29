import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);

let modalRoot = document.querySelector("#modal-root");

if (!modalRoot) {
    const modalRootDiv = document.createElement("div");
    modalRootDiv.id = "modal-root";
    document.body.appendChild(modalRootDiv);
    modalRoot = modalRootDiv;
}

const Modal = ({ onClose, children }) => {
    useEffect(() => {
        const handleKeydown = (e) => {
            if (e.code === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeydown);

        return () => document.removeEventListener("keydown", handleKeydown);
    });

    return createPortal(
        <div className={cx("wrapper")}>
            <div onClick={onClose} className={cx("layout")}></div>
            {children}
        </div>,
        modalRoot
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
