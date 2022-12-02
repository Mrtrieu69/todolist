import { useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getRandomId, getFlag } from "../../utils";

import styles from "./Home.module.scss";
import { Modal } from "../../components";
import { addNewProject } from "../../actions/project";
import { addNewTaskList } from "../../actions/tasks";

const cx = classNames.bind(styles);

const ModalForm = ({ onClose }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [isError, setIsError] = useState(false);

    const projects = useSelector((state) => state.projects.list);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = getRandomId();
        const flag = getFlag(title.trim());

        const isAlready = projects.find((project) => project.flag === flag);

        if (!isAlready) {
            dispatch(
                addNewProject({
                    id,
                    title,
                    desc,
                    path: `/tasks/${flag}`,
                    flag,
                })
            );
            dispatch(addNewTaskList(flag));
            onClose();
        } else {
            setIsError(true);
        }
    };

    const handleOnchange = (value) => {
        setTitle(value);
        setIsError(false);
    };

    return (
        <Modal onClose={onClose}>
            <form onSubmit={(e) => handleSubmit(e)} className={cx("form")}>
                <h2 className={cx("form-title")}>Create a Project</h2>
                <div className={cx("form-group")}>
                    <label className={cx("form-label")}>Project name</label>
                    <input
                        value={title}
                        onChange={(e) => handleOnchange(e.target.value)}
                        type="text"
                        className={cx("form-control", { error: isError })}
                        placeholder="English project"
                    />
                    {isError && (
                        <p className={cx("text-error")}>
                            This project name already exists.
                        </p>
                    )}
                </div>
                <div className={cx("form-group")}>
                    <label className={cx("form-label")}>Project description</label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        type="text"
                        className={cx("form-control", "text-area")}
                        placeholder="Homework by Alexander"
                    />
                </div>
                <button
                    className={cx("form-submit", {
                        disable: title.trim().length === 0,
                    })}
                >
                    Create
                </button>
            </form>
        </Modal>
    );
};

ModalForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ModalForm;
