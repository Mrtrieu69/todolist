import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const useOutsideClick = (
    handleAction,
    showAction,
    setShowAction,
    setValue,
    value = "",
    submitWhenClickOutside = true
) => {
    const ref = useRef();

    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowAction(false);
                setValue(value);
                if (!submitWhenClickOutside) return;
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
            e.stopPropagation();
        };

        if (showAction) {
            setTimeout(() => {
                document.body.addEventListener("click", handleClick);
                document.body.addEventListener("keydown", handleKeydown);
            }, 0);
        }

        return () => {
            if (showAction) {
                setTimeout(() => {
                    document.body.removeEventListener("click", handleClick);
                    document.body.removeEventListener("keydown", handleKeydown);
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
    submitWhenClickOutside: PropTypes.bool,
};

export default useOutsideClick;
