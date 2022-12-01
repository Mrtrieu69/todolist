import { PROJECTS_DEFAULT } from "../data";

const projectsFromLocalStorage = JSON.parse(localStorage.getItem("projects"));

const projectReducer = (
    state = projectsFromLocalStorage || PROJECTS_DEFAULT,
    action
) => {
    switch (action.type) {
        case "ADD_PROJECT": {
            const newList = [...state.list];
            newList.push(action.payload);

            return {
                ...state,
                list: newList,
            };
        }
        case "DELETE_PROJECT": {
            return {
                ...state,
                list: state.list.filter((item) => item.id !== action.payload),
            };
        }
        default:
            return state;
    }
};

export default projectReducer;
