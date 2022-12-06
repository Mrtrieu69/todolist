import { useRef, useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./TaskList.module.scss";
import { deleteTask, editTask } from "../../../../actions/tasks";
import { deleteTaskItem } from "../../../../actions/taskItems";
import { useOutsideClick } from "../../../../hooks";
import ModalDetail from "../ModalDetail";
import { ModalDelete } from "../../../../components";

// icons
import { ImFileEmpty } from "react-icons/im";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { FaRegComment, FaTasks } from "react-icons/fa";

const cx = classNames.bind(styles);

const getQuantityComment = (currentComments) => {
    let count = 0;

    count += currentComments.length;

    currentComments.forEach((comment) => {
        if (comment.replies.length > 0) {
            count += comment.replies.length;
        }
    });

    return count;
};

const TaskItem = ({
    task,
    index,
    id,
    idList,
    status,
    label,
    createDate,
    endDate,
    desc,
    priority,
}) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [value, setValue] = useState(task);
    const { flag } = useParams();
    const dispatch = useDispatch();
    const inputRef = useRef();

    const currentTaskItem = useSelector((state) => state.taskItems[id]);

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

    const ref = useOutsideClick(handleEdit, showEdit, setShowEdit, setValue, value);

    const handleShowEdit = () => {
        setShowEdit(true);
        setTimeout(() => {
            // Move focus to End of textarea
            const end = value.length;
            inputRef.current.setSelectionRange(end, end);
            inputRef.current.focus();
        }, 0);
    };

    const handleCloseShowDetail = () => {
        setShowDetail(false);
    };

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
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
                                        <textarea
                                            ref={inputRef}
                                            className={cx("input")}
                                            type="text"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                    </>
                                ) : (
                                    <div
                                        onClick={() => setShowDetail(true)}
                                        className={cx("task")}
                                    >
                                        <div className={cx("task-info")}>
                                            <span className={cx("order")}>
                                                {index + 1}.
                                            </span>
                                            <p className={cx("text-task")}>{task}</p>
                                        </div>
                                        <div className={cx("detail-quantity")}>
                                            {currentTaskItem.comments.length > 0 && (
                                                <div className={cx("comment-quantity")}>
                                                    <span className={cx("comment-icon")}>
                                                        <FaRegComment />
                                                    </span>
                                                    {getQuantityComment(
                                                        currentTaskItem.comments
                                                    )}
                                                </div>
                                            )}
                                            {currentTaskItem.subTaskItems.length > 0 && (
                                                <div className={cx("comment-quantity")}>
                                                    <span className={cx("comment-icon")}>
                                                        <FaTasks />
                                                    </span>
                                                    {currentTaskItem.subTaskItems.length}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {!showEdit && (
                                <div className={cx("controls")}>
                                    <span onClick={handleShowEdit} className={cx("icon")}>
                                        <BiEditAlt />
                                    </span>
                                    <span
                                        onClick={() => setShowModalDelete(true)}
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
                                createDate={createDate}
                                endDate={endDate}
                                desc={desc}
                                priority={priority}
                            />
                        )}
                        {showModalDelete && (
                            <ModalDelete
                                onClose={handleCloseModalDelete}
                                onDelete={handleDeleteTask}
                                deleteObj={{ title: "this task" }}
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
    createDate: PropTypes.string,
    endDate: PropTypes.string,
    desc: PropTypes.string,
    priority: PropTypes.string,
};

export default TaskItem;
