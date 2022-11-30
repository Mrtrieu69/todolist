import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./TaskList.module.scss";
import { deleteTask } from "../../../../actions/tasks";

const cx = classNames.bind(styles);

const TaskItem = ({ task, index, id, idList }) => {
    const { flag } = useParams();
    const dispatch = useDispatch();
    const handleDeleteTask = () => {
        dispatch(deleteTask({ id, flag, idList }));
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
                            className={cx("item", {
                                dragging: snapshot.isDragging,
                            })}
                        >
                            <div className={cx("card")}>
                                <p className={cx("task")}>{task}</p>
                            </div>
                            <div className={cx("controls")}>
                                <span className={cx("icon")}>
                                    <AiOutlineEdit />
                                </span>
                                <span
                                    onClick={handleDeleteTask}
                                    className={cx("icon")}
                                >
                                    <AiOutlineDelete />
                                </span>
                            </div>
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
