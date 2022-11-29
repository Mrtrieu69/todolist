import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { BsCheckLg } from "react-icons/bs";

import styles from "./Tasks.module.scss";
import userImage from "../../assets/img/me.jpg";
import banner from "../../assets/img/webb1.jpg";
import { TaskList } from "./components";

const cx = classNames.bind(styles);

const Tasks = () => {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <Link className={cx("link")} to="/">
                    <span className={cx("icon")}>
                        <FcHome />
                    </span>
                    Home
                </Link>
                <div className={cx("user")}>
                    <p className={cx("name")}>Trieu Tam</p>
                    <img
                        src={userImage}
                        className={cx("image")}
                        alt="Trieu Tam"
                    />
                </div>
            </header>
            <img src={banner} className={cx("banner")} alt="" />
            <main className={cx("main")}>
                <h1 className={cx("title")}>
                    <span className={cx("icon", "check")}>
                        <BsCheckLg />
                    </span>
                    Task lisk
                </h1>
                <div className={cx("container")}>
                    <TaskList status="queue" label="Queue" taskList={[]} />
                    <TaskList
                        status="development"
                        label="Development"
                        taskList={[]}
                    />
                    <TaskList status="done" label="Done 🙌" taskList={[]} />
                </div>
            </main>
        </div>
    );
};

export default Tasks;
