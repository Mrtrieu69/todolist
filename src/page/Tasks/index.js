import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

import styles from "./Tasks.module.scss";
import userImage from "../../assets/images/me.jpg";
import { TaskList } from "./components";
import { changeItemInMultiList } from "../../actions/tasks";

// icons
import { FcHome } from "react-icons/fc";
import { BsCheckLg, BsSearch } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

const cx = classNames.bind(styles);

const onDragEnd = (result, taskList, flag, dispatch) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    dispatch(
        changeItemInMultiList({
            flag,
            taskList,
            source,
            destination,
            draggableId,
        })
    );
};

const Tasks = () => {
    const [value, setValue] = useState("");
    const [showSearch, setShowSearch] = useState("");

    const { flag } = useParams();
    const tasks = useSelector((state) => state.tasks);
    const projects = useSelector((state) => state.projects);
    const taskList = tasks[flag];
    const dispatch = useDispatch();
    const inputRef = useRef();

    const currentProject = projects.list.find((project) => project.flag === flag);

    const handleToggleShowSearch = () => {
        setShowSearch(!showSearch);
        setValue("");

        if (!showSearch) {
            inputRef.current.focus();
        }
    };

    const handleHideSearch = () => {
        setShowSearch(false);
        setValue("");
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <>
            <Helmet>
                <title>Task List</title>
            </Helmet>
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
                        <img src={userImage} className={cx("image")} alt="Trieu Tam" />
                    </div>
                </header>
                <div className={cx("banner")}>
                    <h1 className={cx("banner-title")}>{currentProject.title}</h1>
                    <p className={cx("banner-desc")}>{currentProject.desc}</p>
                </div>
                <main className={cx("main")}>
                    <h2 className={cx("title")}>
                        <span className={cx("icon", "check")}>
                            <BsCheckLg />
                        </span>
                        Task lisk
                    </h2>
                    <p className={cx("desc")}>
                        Use this template to track your personal tasks.
                    </p>
                    <p className={cx("desc")}>
                        Click <span className={cx("separate")}>+ New</span> to create a
                        new task directly on this board.
                    </p>
                    <div className={cx("search")}>
                        <span
                            onClick={handleToggleShowSearch}
                            className={cx("icon-search")}
                        >
                            <BsSearch />
                        </span>
                        <div className={cx("search-control", { show: showSearch })}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Type to search..."
                                className={cx("search-input")}
                            />
                            <span
                                onClick={handleHideSearch}
                                className={cx("icon-delete")}
                            >
                                <TiDelete />
                            </span>
                        </div>
                    </div>
                    <div className={cx("container")}>
                        <DragDropContext
                            onDragEnd={(result) =>
                                onDragEnd(result, taskList, flag, dispatch)
                            }
                        >
                            {Object.entries(taskList).map(([id, list]) => (
                                <TaskList
                                    valueSearch={value}
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
        </>
    );
};

export default Tasks;
