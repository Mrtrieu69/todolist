import { useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./TaskList.module.scss";
import TaskItem from "./TaskItem";
import { addNewTask } from "../../../../actions/tasks";
import { addNewTaskItem } from "../../../../actions/taskItems";
import { getRandomId, getCurrentTime } from "../../../../utils";
import { useOutsideClick } from "../../../../hooks";

// icons
import { AiOutlinePlus } from "react-icons/ai";
import { ImFileEmpty } from "react-icons/im";

const cx = classNames.bind(styles);

const TaskList = ({ status, label, taskList, idList, valueSearch }) => {
    const [showAddTask, setShowAddTask] = useState(false);
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    const { flag } = useParams();

    const inputRef = useRef();

    const handleShowAddTask = () => {
        setTimeout(() => {
            inputRef.current.focus();
        }, 0);
        setShowAddTask(true);
    };
    const handleAddTask = () => {
        if (value.trim().length === 0) return;

        const id = getRandomId();
        const createDate = getCurrentTime();

        const task = {
            task: value,
            id,
            createDate,
        };

        dispatch(addNewTask({ idList, task, flag }));
        dispatch(addNewTaskItem(id));
    };

    const ref = useOutsideClick(handleAddTask, showAddTask, setShowAddTask, setValue);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("content")}>
                <div className={cx("header")}>
                    <span className={cx("label", { [status]: status })}>{label}</span>
                    <span>
                        {
                            taskList.filter((item) =>
                                item.task
                                    .toLowerCase()
                                    .includes(valueSearch.toLowerCase())
                            ).length
                        }
                    </span>
                </div>
                <div className={cx("body")}>
                    <Droppable droppableId={idList} key={idList}>
                        {(provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        borderTop: 4,
                                        borderTopStyle: "solid",
                                        borderTopColor: snapshot.isDraggingOver
                                            ? "#2383e2"
                                            : "transparent",
                                        minHeight: 370,
                                    }}
                                >
                                    {taskList
                                        .filter((item) =>
                                            item.task
                                                .toLowerCase()
                                                .includes(valueSearch.toLowerCase())
                                        )
                                        .map((item, id) => (
                                            <TaskItem
                                                status={status}
                                                idList={idList}
                                                key={id}
                                                index={id}
                                                label={label}
                                                {...item}
                                            />
                                        ))}
                                    <div
                                        ref={ref}
                                        className={cx("item", "adding", {
                                            hide: !showAddTask,
                                        })}
                                    >
                                        <div className={cx("card")}>
                                            <span className={cx("add-icon")}>
                                                <ImFileEmpty />
                                            </span>
                                            <textarea
                                                ref={inputRef}
                                                placeholder="Type a name..."
                                                className={cx("input")}
                                                type="text"
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        onClick={handleShowAddTask}
                                        className={cx("add")}
                                    >
                                        <span className={cx("plus")}>
                                            <AiOutlinePlus />
                                        </span>
                                        New
                                    </div>
                                    {provided.placeholder}
                                </div>
                            );
                        }}
                    </Droppable>
                </div>
            </div>
        </div>
    );
};

TaskList.propTypes = {
    status: PropTypes.string,
    label: PropTypes.string,
    taskList: PropTypes.array,
    idList: PropTypes.string,
    valueSearch: PropTypes.string,
};

export default TaskList;
