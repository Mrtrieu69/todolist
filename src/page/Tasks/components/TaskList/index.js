import { useState } from "react";
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
import ModalAddTask from "../ModalAddTask";

// icons
import { AiOutlinePlus } from "react-icons/ai";

const cx = classNames.bind(styles);

const TaskList = ({ status, label, taskList, idList, valueSearch }) => {
    const [showAddTask, setShowAddTask] = useState(false);

    const handleShowAddTask = () => {
        setShowAddTask(true);
    };

    const handleCloseModal = () => {
        setShowAddTask(false);
    };

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
                                        onClick={handleShowAddTask}
                                        className={cx("add")}
                                    >
                                        <span className={cx("plus")}>
                                            <AiOutlinePlus />
                                        </span>
                                        New
                                    </div>
                                    {showAddTask && (
                                        <ModalAddTask
                                            idList={idList}
                                            onClose={handleCloseModal}
                                        />
                                    )}
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
