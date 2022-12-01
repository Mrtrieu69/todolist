import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import styles from "./Home.module.scss";
import { Modal } from "../../components";
import { deleteProject } from "../../actions/project";
import { deleteTaskList } from "../../actions/tasks";

const cx = classNames.bind(styles);

const ModalDelete = ({ onClose, project }) => {
    const dispatch = useDispatch();

    const handleDeleteProject = () => {
        dispatch(deleteProject(project.id));
        dispatch(deleteTaskList(project.flag));
        onClose();
    };

    return (
        <Modal onClose={onClose}>
            <div className={cx("body-delete")}>
                <p>
                    Are you sure you want to delete <b>{project.title}</b>?
                </p>
                <div className={cx("actions")}>
                    <button
                        onClick={handleDeleteProject}
                        className={cx("delete")}
                    >
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
    project: PropTypes.object.isRequired,
};

export default ModalDelete;
