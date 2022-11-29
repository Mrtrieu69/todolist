import { randomId, getFlag } from "../utils";

const id = randomId();
const flag = getFlag("Housework");

const initialState = {
    list: [
        {
            id,
            path: `/tasks/${flag}`,
            title: "Housework",
            desc: "Housework by Mom",
        },
    ],
};

const getLocalStorage = JSON.parse(localStorage.getItem("projects"));

const projectReducer = (state = getLocalStorage || initialState, action) => {
    switch (action.type) {
        case "ADD_PROJECT":
            const newList = [...state.list];
            newList.push(action.payload);

            return {
                ...state,
                list: newList,
            };

        case "DELETE_PROJECT":
            return {
                ...state,
                list: state.list.filter((item) => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default projectReducer;
