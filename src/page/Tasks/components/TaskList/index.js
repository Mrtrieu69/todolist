import { useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { AiOutlinePlus } from "react-icons/ai";
import { ImFileEmpty } from "react-icons/im";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./TaskList.module.scss";
import TaskItem from "./TaskItem";
import { addNewTask } from "../../../../actions/tasks";
import { randomId } from "../../../../utils";
import { useOutsideClick } from "../../../../hooks";

const cx = classNames.bind(styles);

const TaskList = ({ status, label, taskList, idList }) => {
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

        const task = {
            task: value,
            id: randomId(),
        };
        dispatch(addNewTask({ idList, task, flag }));
    };

    const ref = useOutsideClick(
        handleAddTask,
        showAddTask,
        setShowAddTask,
        setValue
    );

    return (
        <div className={cx("wrapper")}>
            <div className={cx("content")}>
                <div className={cx("header")}>
                    <span className={cx("label", { [status]: status })}>
                        {label}
                    </span>
                    <span>{taskList.length}</span>
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
                                        minHeight: 400,
                                    }}
                                >
                                    {taskList.map((item, id) => (
                                        <TaskItem
                                            idList={idList}
                                            key={id}
                                            index={id}
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
                                            <input
                                                ref={inputRef}
                                                placeholder="Type a name..."
                                                className={cx("input")}
                                                type="text"
                                                value={value}
                                                onChange={(e) =>
                                                    setValue(e.target.value)
                                                }
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
};

export default TaskList;
