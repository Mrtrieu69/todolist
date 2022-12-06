import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./ModalDetail.module.scss";
import { Modal } from "../../../../components";
import SubTasks from "./SubTasks";
import Comments from "./Comments";
import { getTimeToX } from "../../../../utils";

// icons
import {
    BsCalendarDate,
    BsCalendarCheck,
    BsClock,
    BsPlayCircle,
    BsExclamationDiamond,
} from "react-icons/bs";

const cx = classNames.bind(styles);

const ModalDetail = ({
    onClose,
    id: idTaskItem,
    status: statusTaskItem,
    label,
    task,
    createDate,
    endDate,
    desc,
    priority,
}) => {
    const taskItems = useSelector((state) => state.taskItems);
    const taskItem = taskItems[idTaskItem];

    const DETAILS = [
        { Icon: BsCalendarDate, label: "Date Created", value: createDate },
        { Icon: BsCalendarCheck, label: "Date Finished", value: endDate },
        {
            Icon: BsClock,
            label: "Time at work",
            value: getTimeToX(createDate, endDate),
        },
    ];

    useEffect(() => {
        localStorage.setItem("task_items", JSON.stringify(taskItems));
    }, [taskItems]);

    return (
        <Modal onClose={onClose}>
            <div className={cx("content")}>
                <h2 className={cx("title")}>{task}</h2>
                <p className={cx("desc")}>{desc}</p>
                <div className={cx("details")}>
                    {DETAILS.map((detail, id) => {
                        const Icon = detail.Icon;

                        return (
                            <div key={id} className={cx("detail")}>
                                <div className={cx("item")}>
                                    <span className={cx("icon")}>
                                        <Icon />
                                    </span>
                                    {detail.label}
                                </div>
                                <div className={cx("item", "text")}>{detail.value}</div>
                            </div>
                        );
                    })}
                    <div className={cx("detail")}>
                        <div className={cx("item")}>
                            <span className={cx("icon")}>
                                <BsPlayCircle />
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
                    <div className={cx("detail")}>
                        <div className={cx("item")}>
                            <span className={cx("icon")}>
                                <BsExclamationDiamond />
                            </span>
                            Priority
                        </div>
                        <div className={cx("item")}>
                            <span
                                className={cx("priority", {
                                    [priority]: priority,
                                })}
                            >
                                {priority}
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
    createDate: PropTypes.string,
    endDate: PropTypes.any,
    desc: PropTypes.string,
    priority: PropTypes.string,
};

export default ModalDetail;
