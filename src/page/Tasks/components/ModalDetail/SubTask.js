import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./ModalDetail.module.scss";

// icons
import { BsTrash } from "react-icons/bs";
import { useOutsideClick } from "../../../../hooks";
import {
    updateSubTaskItem,
    deleteSubTaskItem,
    updateStatusSubTaskItem,
} from "../../../../actions/taskItems";

const cx = classNames.bind(styles);

const SubTask = ({ status, subTask, id: idSubTask, index, idTaskItem }) => {
    const [checkbox, setCheckbox] = useState(status);
    const [value, setValue] = useState(subTask);
    const [showEditSubTask, setShowEditSubTask] = useState(false);
    const dispatch = useDispatch();

    const inputRef = useRef();

    const handleDeleteSubTask = () => {
        dispatch(deleteSubTaskItem({ idTaskItem, index }));
    };

    const handleEditSubTask = () => {
        if (value.trim().length === 0) {
            handleDeleteSubTask();
        } else {
            dispatch(
                updateSubTaskItem({
                    index,
                    value,
                    idTaskItem,
                    status: checkbox,
                })
            );
        }
    };

    const ref = useOutsideClick(
        handleEditSubTask,
        showEditSubTask,
        setShowEditSubTask,
        setValue,
        value
    );

    const handleShowAddComment = () => {
        setShowEditSubTask(true);
        setTimeout(() => {
            inputRef.current.focus();
        }, 0);
    };

    const handleCheckBox = (e) => {
        const isChecked = e.target.checked;
        setCheckbox(isChecked);
        if (showEditSubTask) {
            return;
        }
        dispatch(
            updateStatusSubTaskItem({ idTaskItem, index, status: isChecked })
        );
    };

    return (
        <div className={cx("subtask", { adding: showEditSubTask })}>
            <div ref={ref} className={cx("subtask-block")}>
                <input
                    id={idSubTask}
                    type="checkbox"
                    onChange={handleCheckBox}
                    checked={checkbox}
                    className={cx("checkbox")}
                />
                <label htmlFor={idSubTask} className={cx("label")}></label>
                {showEditSubTask ? (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className={cx("input", "text-subtask")}
                        ref={inputRef}
                    />
                ) : (
                    <p
                        onClick={handleShowAddComment}
                        className={cx("text-subtask")}
                    >
                        {subTask}
                    </p>
                )}
            </div>
            <div onClick={handleDeleteSubTask} className={cx("delete-subtask")}>
                <BsTrash />
            </div>
        </div>
    );
};

SubTask.propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,
    subTask: PropTypes.string,
    status: PropTypes.bool,
    idTaskItem: PropTypes.string,
};

export default SubTask;
