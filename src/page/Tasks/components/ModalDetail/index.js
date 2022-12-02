import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./ModalDetail.module.scss";
import { Modal } from "../../../../components";

// icons
import { BsCaretUpSquare, BsCalendarDate } from "react-icons/bs";
import SubTasks from "./SubTasks";
import Comments from "./Comments";

const cx = classNames.bind(styles);

const ModalDetail = ({
    onClose,
    id: idTaskItem,
    status: statusTaskItem,
    label,
    task,
    createDate,
}) => {
    const taskItems = useSelector((state) => state.taskItems);
    const taskItem = taskItems[idTaskItem];

    useEffect(() => {
        localStorage.setItem("task_items", JSON.stringify(taskItems));
    }, [taskItems]);

    return (
        <Modal onClose={onClose} disableEsc>
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
                        <div className={cx("item", "text")}>{createDate}</div>
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
                <Comments idTaskItem={idTaskItem} taskItem={taskItem} />
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
    createDate: PropTypes.string.isRequired,
};

export default ModalDetail;
