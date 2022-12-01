import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./ModalDetail.module.scss";
import { Modal } from "../../../../components";
import userImage from "../../../../assets/img/me.jpg";
import Comment from "./Comment";

// icons
import {
    BsCaretUpSquare,
    BsCalendarDate,
    BsFillArrowUpCircleFill,
} from "react-icons/bs";
import SubTasks from "./SubTasks";

const cx = classNames.bind(styles);

const ModalDetail = ({
    onClose,
    id: idTaskItem,
    status: statusTaskItem,
    label,
    task,
}) => {
    const [value, setValue] = useState("");
    const taskItems = useSelector((state) => state.taskItems);
    const taskItem = taskItems[idTaskItem];

    useEffect(() => {
        localStorage.setItem("task_items", JSON.stringify(taskItems));
    }, [taskItems]);

    return (
        <Modal onClose={onClose}>
            <div className={cx("content")}>
                <h2 className={cx("title")}>{task}</h2>
                <div className={cx("details")}>
                    <div className={cx("detail")}>
                        <div className={cx("item")}>
                            <span className={cx("icon")}>
                                <BsCalendarDate />
                            </span>
                            Date Created
                        </div>
                        <div className={cx("item", "text")}>
                            November 29, 2022 4:09 PM
                        </div>
                    </div>
                    <div className={cx("detail")}>
                        <div className={cx("item")}>
                            <span className={cx("icon")}>
                                <BsCaretUpSquare />
                            </span>
                            Status
                        </div>
                        <div className={cx("item")}>
                            <span
                                className={cx("status", {
                                    [statusTaskItem]: statusTaskItem,
                                })}
                            >
                                {label}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx("comments")}>
                    {taskItem.comments.map((comment) => (
                        <Comment key={comment.id} {...comment} />
                    ))}
                    <div className={cx("add-comment")}>
                        <img className={cx("image")} src={userImage} alt="Me" />
                        <input
                            className={cx("input")}
                            type="text"
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                            placeholder="Add a comment..."
                        />
                        <span
                            className={cx("icon", "submit", {
                                disable: value.trim().length === 0,
                            })}
                        >
                            <BsFillArrowUpCircleFill />
                        </span>
                    </div>
                </div>
                <SubTasks idTaskItem={idTaskItem} taskItem={taskItem} />
            </div>
        </Modal>
    );
};

ModalDetail.propTypes = {
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
};

export default ModalDetail;
