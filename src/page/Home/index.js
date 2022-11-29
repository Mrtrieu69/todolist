import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";

import styles from "./Home.module.scss";
import ModalForm from "./ModalForm";
import ModalDelete from "./ModalDelete";

const cx = classNames.bind(styles);

const Home = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(null);

    const projects = useSelector((state) => state.project);

    const handleShowModalDelete = (project) => {
        setIsShowModalDelete(true);
        setCurrentSelected(project);
    };

    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <h1>Projects</h1>
            </header>
            <main className={cx("container", "row")}>
                {projects.list.map((project, id) => (
                    <div
                        key={id}
                        className={cx("item", "col", "l-3", "s-4", "c-12")}
                    >
                        <div className={cx("card")}>
                            <Link className={cx("link")} to={project.path}>
                                <h2 className={cx("title")}>{project.title}</h2>
                                <p className={cx("disc")}>{project.desc}</p>
                            </Link>
                            <span
                                onClick={() => handleShowModalDelete(project)}
                                className={cx("close")}
                            >
                                <AiOutlineCloseCircle />
                            </span>
                        </div>
                    </div>
                ))}

                <div className={cx("item", "col", "l-3", "s-4", "c-12")}>
                    <div
                        onClick={() => setIsShowModal(true)}
                        className={cx("link", "no-bg")}
                    >
                        <span className={cx("add")}>+</span>
                    </div>
                </div>
            </main>

            {/* Modal Form */}
            {isShowModal && <ModalForm onClose={() => setIsShowModal(false)} />}

            {/* Modal Delete */}
            {isShowModalDelete && (
                <ModalDelete
                    project={currentSelected}
                    onClose={() => setIsShowModalDelete(false)}
                />
            )}
        </div>
    );
};

export default Home;
