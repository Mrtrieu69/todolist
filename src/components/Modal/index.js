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

const Modal = ({ onClose, children, disableEsc = false }) => {
    useEffect(() => {
        const handleKeydown = (e) => {
            if (e.code === "Escape") {
                onClose();
            }
        };

        document.body.style.overflow = "hidden";

        if (!disableEsc) document.addEventListener("keydown", handleKeydown);

        return () => {
            document.body.style.overflow = "unset";

            if (!disableEsc) document.removeEventListener("keydown", handleKeydown);
        };
    });

    return createPortal(
        <div className={cx("wrapper")}>
            <div onClick={onClose} className={cx("layout")}></div>
            <div className={cx("content")}>{children}</div>
        </div>,
        modalRoot
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    disableEsc: PropTypes.bool,
};

export default Modal;
