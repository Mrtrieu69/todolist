import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useMemo, useRef, useState } from "react";

import styles from "./ModalDetail.module.scss";
import userImage from "../../../../assets/images/me.jpg";
import { getCurrentTimeToSecond, getTimeFromNow, randomId } from "../../../../utils";
import { useDispatch } from "react-redux";
import {
    deleteComment,
    deleteReplyComment,
    addReplyComment,
} from "../../../../actions/taskItems";

// icons
import { FaRegComment } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const cx = classNames.bind(styles);

const Comment = ({ text, id, replies = [], createDate, idTaskItem }) => {
    const [showReply, setShowReply] = useState(false);
    const [value, setValue] = useState("");

    const dispatch = useDispatch();
    const inputRef = useRef();

    const handleDeleteComment = () => {
        dispatch(deleteComment({ idTaskItem, id }));
    };

    const handleDeleteReplyComment = (replyId) => {
        dispatch(deleteReplyComment({ idTaskItem, idComment: id, id: replyId }));
    };

    const handleShowReply = () => {
        setShowReply(true);
        setTimeout(() => {
            inputRef.current.focus();
        }, 0);
    };

    const handleAddReplyComment = () => {
        const reply = {
            id: randomId(),
            text: value,
            createDate: getCurrentTimeToSecond(),
        };

        dispatch(addReplyComment({ idComment: id, reply, idTaskItem }));
        setValue("");
        setShowReply(false);
    };

    return (
        <div className={cx("comment")}>
            <div className={cx("comment-block")}>
                <div className={cx("user-info")}>
                    <img className={cx("image")} src={userImage} alt="Me" />
                    <p className={cx("name")}>
                        Trieu Tam
                        <span className={cx("comment-time")}>
                            {getTimeFromNow(createDate)}
                        </span>
                    </p>
                </div>
                <div className={cx("user-comment")}>{text}</div>
                <div className={cx("actions")}>
                    <span onClick={handleShowReply} className={cx("action")}>
                        <FaRegComment />
                    </span>
                    <span onClick={handleDeleteComment} className={cx("action")}>
                        <FiDelete />
                    </span>
                </div>
            </div>
            {replies.map((reply) => (
                <div key={reply.id} className={cx("comment")}>
                    <div className={cx("comment-block")}>
                        <div className={cx("user-info")}>
                            <img className={cx("image")} src={userImage} alt="Me" />
                            <p className={cx("name")}>
                                Trieu Tam
                                <span className={cx("comment-time")}>
                                    {getTimeFromNow(reply.createDate)}
                                </span>
                            </p>
                        </div>
                        <div className={cx("user-comment")}>{reply.text}</div>
                        <div className={cx("actions")}>
                            <span
                                onClick={() => handleDeleteReplyComment(reply.id)}
                                className={cx("action")}
                            >
                                <FiDelete />
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            {showReply && (
                <div className={cx("add-comment")}>
                    <img className={cx("image")} src={userImage} alt="Me" />
                    <input
                        ref={inputRef}
                        className={cx("input")}
                        type="text"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        placeholder="Reply to Trieu Tam..."
                    />
                    <span
                        onClick={handleAddReplyComment}
                        className={cx("action", "submit", {
                            disable: value.trim().length === 0,
                        })}
                    >
                        <BsFillArrowUpCircleFill />
                    </span>
                </div>
            )}
        </div>
    );
};

Comment.proTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
    replies: PropTypes.array,
    createDate: PropTypes.string,
    idTaskItem: PropTypes.string,
};

export default Comment;
