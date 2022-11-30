import { useRef, useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { ImFileEmpty } from "react-icons/im";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./TaskList.module.scss";
import { deleteTask, editTask } from "../../../../actions/tasks";
import { useOutsideClick } from "../../../../hooks";

const cx = classNames.bind(styles);

const TaskItem = ({ task, index, id, idList }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [value, setValue] = useState(task);
    const { flag } = useParams();
    const dispatch = useDispatch();
    const inputRef = useRef();

    const handleEdit = () => {
        dispatch(editTask({ index, flag, idList, value }));
    };

    const ref = useOutsideClick(
        handleEdit,
        showEdit,
        setShowEdit,
        setValue,
        value
    );

    const handleDeleteTask = () => {
        dispatch(deleteTask({ id, flag, idList }));
    };

    const handleShowEdit = () => {
        setShowEdit(true);
        setTimeout(() => {
            inputRef.current.focus();
        }, 0);
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
                                    <p className={cx("task")}>
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
                                        <AiOutlineEdit />
                                    </span>
                                    <span
                                        onClick={handleDeleteTask}
                                        className={cx("icon")}
                                    >
                                        <AiOutlineDelete />
                                    </span>
                                </div>
                            )}
                        </div>
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
};

export default TaskItem;
