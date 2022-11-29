import classNames from "classnames/bind";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import styles from "./TaskList.module.scss";

const cx = classNames.bind(styles);

const TaskItem = () => {
    return (
        <div className={cx("item")}>
            <div className={cx("card")}>
                <p className={cx("task")}>Lam btvn tieng anh btvn tieng anh</p>
            </div>
            <div className={cx("controls")}>
                <span className={cx("icon")}>
                    <AiOutlineEdit />
                </span>
                <span className={cx("icon")}>
                    <AiOutlineDelete />
                </span>
            </div>
        </div>
    );
};

export default TaskItem;
