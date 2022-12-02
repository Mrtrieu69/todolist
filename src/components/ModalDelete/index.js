import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./ModalDelete.module.scss";
import Modal from "../Modal";

const cx = classNames.bind(styles);

const ModalDelete = ({ onClose, onDelete, deleteObj }) => {
    return (
        <Modal onClose={onClose}>
            <div className={cx("body-delete")}>
                <p>
                    Are you sure you want to delete <b>{deleteObj.title}</b>?
                </p>
                <div className={cx("actions")}>
                    <button onClick={onDelete} className={cx("delete")}>
                        Delete
                    </button>
                    <button onClick={onClose} className={cx("cancel")}>
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

ModalDelete.propTypes = {
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    deleteObj: PropTypes.object.isRequired,
};

export default ModalDelete;
