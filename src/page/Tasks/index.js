import React, { useEffect } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { BsCheckLg } from "react-icons/bs";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Tasks.module.scss";
import userImage from "../../assets/img/me.jpg";
import banner from "../../assets/img/webb1.jpg";
import { TaskList } from "./components";
import { changeItemInMultiList } from "../../actions/tasks";

const cx = classNames.bind(styles);

const onDragEnd = (result, taskList, flag, dispatch) => {
    if (!result.destination) return;
    const { source, destination } = result;

    dispatch(
        changeItemInMultiList({
            flag,
            taskList,
            source,
            destination,
        })
    );
};

const Tasks = () => {
    const { flag } = useParams();
    const tasks = useSelector((state) => state.tasks);
    const taskList = tasks[flag];
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

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
                <p className={cx("desc")}>
                    Use this template to track your personal tasks.
                </p>
                <p className={cx("desc")}>
                    Click <span className={cx("separate")}>+ New</span> to
                    create a new task directly on this board.
                </p>
                <div className={cx("container")}>
                    <DragDropContext
                        onDragEnd={(result) =>
                            onDragEnd(result, taskList, flag, dispatch)
                        }
                    >
                        {Object.entries(taskList).map(([id, list]) => (
                            <TaskList
                                key={id}
                                idList={id}
                                status={list.status}
                                label={list.label}
                                taskList={list.list}
                            />
                        ))}
                    </DragDropContext>
                </div>
            </main>
        </div>
    );
};

export default Tasks;
