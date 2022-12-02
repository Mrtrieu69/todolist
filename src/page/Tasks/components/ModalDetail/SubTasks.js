import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./ModalDetail.module.scss";
import SubTask from "./SubTask";
import { useOutsideClick } from "../../../../hooks";
import { getRandomId } from "../../../../utils";
import { addSubTaskItem } from "../../../../actions/taskItems";

// icons
import { BsPlus } from "react-icons/bs";

const cx = classNames.bind(styles);

const SubTasks = ({ taskItem, idTaskItem }) => {
    const [showAddSubTask, setShowAddSubtask] = useState(false);
    const [value, setValue] = useState("");
    const [checkbox, setCheckbox] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const id = useMemo(() => getRandomId(), [showAddSubTask]);

    const inputRef = useRef();
    const dispatch = useDispatch();

    const handleShowAddSubTask = () => {
        setShowAddSubtask(true);

        setTimeout(() => {
            inputRef.current.focus();
        }, 0);
    };

    const handleAddSubTask = () => {
        if (value.trim().length === 0) return;
        dispatch(addSubTaskItem({ value, status: checkbox, id, idTaskItem }));
    };

    const ref = useOutsideClick(
        handleAddSubTask,
        showAddSubTask,
        setShowAddSubtask,
        setValue
    );

    return (
        <div className={cx("subtasks")}>
            {taskItem.subTaskItems.map((subTask, index) => (
                <SubTask
                    key={subTask.id}
                    {...subTask}
                    index={index}
                    idTaskItem={idTaskItem}
                />
            ))}
            {showAddSubTask && (
                <div className={cx("subtask", "adding")}>
                    <div ref={ref} className={cx("subtask-block")}>
                        <input
                            id={id}
                            type="checkbox"
                            onChange={(e) => setCheckbox(e.target.checked)}
                            checked={checkbox}
                            className={cx("checkbox")}
                        />
                        <label htmlFor={id} className={cx("label")}></label>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className={cx("input", "text-subtask")}
                            ref={inputRef}
                        />
                    </div>
                </div>
            )}
            <div onClick={handleShowAddSubTask} className={cx("add-subtask")}>
                <span className={cx("icon")}>
                    <BsPlus />
                </span>
                Add a subtask
            </div>
        </div>
    );
};

SubTasks.propTypes = {
    taskItem: PropTypes.object.isRequired,
    idTaskItem: PropTypes.string.isRequired,
};

export default SubTasks;
