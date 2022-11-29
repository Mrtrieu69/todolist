import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { AiOutlinePlus } from "react-icons/ai";
import { ImFileEmpty } from "react-icons/im";

import styles from "./TaskList.module.scss";
import TaskItem from "./TaskItem";

const cx = classNames.bind(styles);

const TaskList = ({ status, label, taskList }) => {
    const [showAddTask, setShowAddTask] = useState(false);
    const [value, setValue] = useState("");

    const inputRef = useRef();

    const handleShowAddTask = () => {
        setTimeout(() => {
            inputRef.current.focus();
        }, 0);
        setShowAddTask(true);
    };

    useEffect(() => {
        // Add task using redux
        const handleAddTask = () => {
            console.log(value);
        };

        const removeClickListener = () => {
            window.removeEventListener("click", outsideClickListener);
        };

        const outsideClickListener = (e) => {
            if (!e.target.closest(`.${cx("item")}`)) {
                if (value.trim() !== 0) {
                    handleAddTask();
                }
                setValue("");
                setShowAddTask(false);
                removeClickListener();
            }
        };

        const handleKeydown = (e) => {
            if (e.code !== "Escape" && e.code !== "Enter") return;

            setValue("");
            removeClickListener();
            setShowAddTask(false);
            if (e.code === "Enter") {
                handleAddTask();
            }
        };

        if (showAddTask) {
            setTimeout(() => {
                window.addEventListener("click", outsideClickListener);
                window.addEventListener("keydown", handleKeydown);
            }, 0);
        }

        return () => {
            if (showAddTask) {
                window.removeEventListener("click", outsideClickListener);
                window.removeEventListener("keydown", handleKeydown);
            }
        };
    }, [showAddTask, value]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("content")}>
                <div className={cx("header")}>
                    <span className={cx("label", { [status]: status })}>
                        {label}
                    </span>
                    <span>1</span>
                </div>
                <div className={cx("body")}>
                    <TaskItem />
                    <TaskItem />
                    <div
                        className={cx("item", "adding", { hide: !showAddTask })}
                    >
                        <div className={cx("card")}>
                            <span className={cx("add-icon")}>
                                <ImFileEmpty />
                            </span>
                            <input
                                ref={inputRef}
                                placeholder="Type a name..."
                                className={cx("input")}
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </div>
                    </div>
                    <div onClick={handleShowAddTask} className={cx("add")}>
                        <span className={cx("plus")}>
                            <AiOutlinePlus />
                        </span>
                        New
                    </div>
                </div>
            </div>
        </div>
    );
};

TaskList.propTypes = {
    status: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    taskList: PropTypes.array.isRequired,
};

export default TaskList;
