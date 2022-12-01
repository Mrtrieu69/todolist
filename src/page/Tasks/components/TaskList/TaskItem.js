import { useRef, useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./TaskList.module.scss";
import { deleteTask, editTask } from "../../../../actions/tasks";
import { deleteTaskItem } from "../../../../actions/taskItems";
import { useOutsideClick } from "../../../../hooks";
import ModalDetail from "../ModalDetail";

// icons
import { ImFileEmpty } from "react-icons/im";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

const cx = classNames.bind(styles);

const TaskItem = ({ task, index, id, idList, status, label }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [value, setValue] = useState(task);
    const [showDetail, setShowDetail] = useState(false);
    const { flag } = useParams();
    const dispatch = useDispatch();
    const inputRef = useRef();

    const handleDeleteTask = () => {
        dispatch(deleteTask({ id, flag, idList }));
        dispatch(deleteTaskItem(id));
    };

    const handleEdit = () => {
        if (value.trim().length === 0) {
            handleDeleteTask();
        } else {
            dispatch(editTask({ index, flag, idList, value }));
        }
    };

    const ref = useOutsideClick(
        handleEdit,
        showEdit,
        setShowEdit,
        setValue,
        value
    );

    const handleShowEdit = () => {
        setShowEdit(true);
        setTimeout(() => {
            inputRef.current.focus();
        }, 0);
    };

    const handleCloseShowDetail = () => {
        setShowDetail(false);
    };

    return (
        <Draggable key={id} draggableId={id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            userSelect: "none",
                            ...provided.draggableProps.style,
                        }}
                    >
                        <div
                            ref={ref}
                            className={cx("item", {
                                dragging: snapshot.isDragging,
                                adding: showEdit,
                            })}
                        >
                            <div className={cx("card")}>
                                {showEdit ? (
                                    <>
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
                                    </>
                                ) : (
                                    <p
                                        onClick={() => setShowDetail(true)}
                                        className={cx("task")}
                                    >
                                        <span className={cx("order")}>
                                            {index + 1}.
                                        </span>
                                        {task}
                                    </p>
                                )}
                            </div>
                            {!showEdit && (
                                <div className={cx("controls")}>
                                    <span
                                        onClick={handleShowEdit}
                                        className={cx("icon")}
                                    >
                                        <BiEditAlt />
                                    </span>
                                    <span
                                        onClick={handleDeleteTask}
                                        className={cx("icon")}
                                    >
                                        <BsTrash />
                                    </span>
                                </div>
                            )}
                        </div>
                        {showDetail && (
                            <ModalDetail
                                status={status}
                                onClose={handleCloseShowDetail}
                                id={id}
                                label={label}
                                task={task}
                            />
                        )}
                    </div>
                );
            }}
        </Draggable>
    );
};

TaskItem.propTypes = {
    task: PropTypes.string,
    id: PropTypes.string,
    index: PropTypes.number,
    idList: PropTypes.string,
    status: PropTypes.string,
    label: PropTypes.string,
};

export default TaskItem;
