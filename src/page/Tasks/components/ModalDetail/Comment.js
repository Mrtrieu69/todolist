import classNames from "classnames/bind";

import styles from "./ModalDetail.module.scss";
import userImage from "../../../../assets/img/me.jpg";

const cx = classNames.bind(styles);

const Comment = () => {
    return (
        <div className={cx("comment")}>
            <div className={cx("user-info")}>
                <img className={cx("image")} src={userImage} alt="Me" />
                <p className={cx("name")}>
                    Trieu Tam
                    <span className={cx("comment-time")}>Just now</span>
                </p>
            </div>
            <div className={cx("user-comment")}>Hay lam anh oi!!</div>
        </div>
    );
};

export default Comment;
