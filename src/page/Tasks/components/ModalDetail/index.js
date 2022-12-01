import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import {
    BsCaretUpSquare,
    BsCalendarDate,
    BsFillArrowUpCircleFill,
    BsPlus,
} from "react-icons/bs";

import styles from "./ModalDetail.module.scss";
import { Modal } from "../../../../components";
import userImage from "../../../../assets/img/me.jpg";
import Comment from "./Comment";
import SubTask from "./SubTask";

const cx = classNames.bind(styles);

const ModalDetail = ({ onClose, id: idTaskItem }) => {
    const [value, setValue] = useState("");
    return (
        <Modal onClose={onClose}>
            <div className={cx("content")}>
                <h2 className={cx("title")}>Coke rice</h2>
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
                            <span className={cx("status", "done")}>
                                Done 🙌
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx("comments")}>
                    <Comment />
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
                <div className={cx("subtasks")}>
                    <SubTask />
                    <div className={cx("add-subtask")}>
                        <span className={cx("icon")}>
                            <BsPlus />
                        </span>
                        Add a subtask
                    </div>
                </div>
            </div>
        </Modal>
    );
};

ModalDetail.propTypes = {
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};

export default ModalDetail;
