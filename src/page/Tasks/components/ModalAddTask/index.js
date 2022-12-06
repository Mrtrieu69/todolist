import PropTypes from "prop-types";
import { useState } from "react";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./ModalAddTask.module.scss";
import { Modal } from "../../../../components";
import { addNewTask } from "../../../../actions/tasks";
import { addNewTaskItem } from "../../../../actions/taskItems";
import { getRandomId, getCurrentTime } from "../../../../utils";

// icons
import { BsChevronDown } from "react-icons/bs";

const cx = classNames.bind(styles);

const PRIORITIES = [{ title: "low" }, { title: "medium" }, { title: "hight" }];

const ModalAddTask = ({ idList, onClose }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [showPriorities, setShowPriorities] = useState(false);
    const [currentPriority, setCurrentPriority] = useState("medium");

    const { flag } = useParams();
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (title.trim().length === 0 || desc.trim().length === 0) return;

        const id = getRandomId();
        const createDate = getCurrentTime();

        const task = {
            id,
            task: title,
            desc,
            priority: currentPriority,
            createDate,
        };

        dispatch(addNewTask({ idList, task, flag }));
        dispatch(addNewTaskItem(id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTask();
        onClose();
    };

    const handleChangePriority = (value) => {
        setCurrentPriority(value);
        setShowPriorities(false);
    };

    return (
        <Modal onClose={onClose}>
            <form onSubmit={(e) => handleSubmit(e)} className={cx("form")}>
                <h2 className={cx("form-title")}>Add a Task</h2>
                <div className={cx("form-group")}>
                    <label className={cx("form-label")}>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className={cx("form-control")}
                        placeholder="Title"
                    />
                </div>
                <div className={cx("form-group")}>
                    <label className={cx("form-label")}>Priority</label>
                    <div className={cx("form-block")}>
                        <div
                            onClick={() => setShowPriorities(true)}
                            className={cx("form-control", "priority")}
                        >
                            {currentPriority}
                            <span className={cx("arrow")}>
                                <BsChevronDown />
                            </span>
                        </div>
                        {showPriorities && (
                            <div className={cx("list")}>
                                {PRIORITIES.map((priority, id) => (
                                    <div
                                        key={id}
                                        className={cx("item", {
                                            active: priority.title === currentPriority,
                                        })}
                                        onClick={() =>
                                            handleChangePriority(priority.title)
                                        }
                                    >
                                        {priority.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx("form-group")}>
                    <label className={cx("form-label")}>Task description</label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        type="text"
                        className={cx("form-control", "text-area")}
                        placeholder="Description"
                    />
                </div>
                <button
                    className={cx("form-submit", {
                        disable: title.trim().length === 0 || desc.trim().length === 0,
                    })}
                >
                    Create
                </button>
            </form>
        </Modal>
    );
};

ModalAddTask.propTypes = {
    idList: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ModalAddTask;
