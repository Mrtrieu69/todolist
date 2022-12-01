import classNames from "classnames/bind";
import { useState } from "react";

import styles from "./ModalDetail.module.scss";

// icons
import { BsTrash } from "react-icons/bs";

const cx = classNames.bind(styles);

const SubTask = () => {
    const [checkbox, setCheckbox] = useState(false);
    console.log(checkbox);

    return (
        <div className={cx("subtask")}>
            <input
                id="123"
                type="checkbox"
                onChange={(e) => setCheckbox(e.target.checked)}
                checked={checkbox}
                className={cx("checkbox")}
            />
            <label htmlFor="123" className={cx("label")}></label>
            <p className={cx("text-subtask")}>Sub Task new</p>
            <div className={cx("delete-subtask")}>
                <BsTrash />
            </div>
        </div>
    );
};

export default SubTask;
