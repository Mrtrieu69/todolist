import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./ModalDetail.module.scss";
import Comment from "./Comment";
import userImage from "../../../../assets/images/me.jpg";
import { addComment } from "../../../../actions/taskItems";
import { getCurrentTimeToSecond, randomId } from "../../../../utils";

// icons
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const cx = classNames.bind(styles);

const Comments = ({ taskItem, idTaskItem }) => {
    const [value, setValue] = useState("");
    const dispatch = useDispatch();

    const handleAddComment = () => {
        const comment = {
            id: randomId(),
            text: value,
            createDate: getCurrentTimeToSecond(),
            replies: [],
            idTaskItem,
        };

        dispatch(addComment(comment));
        setValue("");
    };

    return (
        <div className={cx("comments")}>
            {taskItem.comments.map((comment) => (
                <Comment
                    key={comment.id}
                    {...comment}
                    idTaskItem={idTaskItem}
                />
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
                    onClick={handleAddComment}
                    className={cx("action", "submit", {
                        disable: value.trim().length === 0,
                    })}
                >
                    <BsFillArrowUpCircleFill />
                </span>
            </div>
        </div>
    );
};

Comments.propTypes = {
    taskItem: PropTypes.object.isRequired,
    idTaskItem: PropTypes.string.isRequired,
};

export default Comments;
