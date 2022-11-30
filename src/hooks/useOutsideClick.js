import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const useOutsideClick = (
    handleAction,
    showAction,
    setShowAction,
    setValue,
    value = ""
) => {
    const ref = useRef();

    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowAction(false);
                setValue(value);
                handleAction();
            }
        };

        const handleKeydown = (e) => {
            if (e.code !== "Escape" && e.code !== "Enter") return;

            if (e.code === "Enter") {
                handleAction();
            }
            setValue(value);
            setShowAction(false);
        };

        if (showAction) {
            setTimeout(() => {
                document.addEventListener("click", handleClick);
                document.addEventListener("keydown", handleKeydown);
            }, 0);
        }

        return () => {
            if (showAction) {
                setTimeout(() => {
                    document.removeEventListener("click", handleClick);
                    document.removeEventListener("keydown", handleKeydown);
                }, 0);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, showAction, handleAction]);

    return ref;
};

useOutsideClick.propTypes = {
    handleAction: PropTypes.func.isRequired,
    showAction: PropTypes.bool.isRequired,
    setValue: PropTypes.func.isRequired,
    setShowAction: PropTypes.func.isRequired,
    value: PropTypes.string,
};

export default useOutsideClick;
