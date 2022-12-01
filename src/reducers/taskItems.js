import { randomId } from "../utils";

const initialState = {
    22635345: {
        comments: [
            { id: randomId(), content: "The first comment..", replies: [] },
        ],
        subTaskItems: [
            { id: randomId(), subTask: "First sub Task", status: true },
            { id: randomId(), subTask: "Second sub Task", status: false },
        ],
    },
    8678565412: {
        comments: [],
        subTaskItems: [],
    },
    784628365: {
        comments: [],
        subTaskItems: [],
    },
    65978373: {
        comments: [],
        subTaskItems: [],
    },
};

const taskItemsFromLocalStorage = JSON.parse(
    localStorage.getItem("task_items")
);

const taskItemsReducer = (
    state = taskItemsFromLocalStorage || initialState,
    action
) => {
    switch (action.type) {
        case "ADD_NEW_TASK_ITEM": {
            const newState = JSON.parse(JSON.stringify(state));
            newState[action.payload] = {
                comments: [],
                subTaskItems: [],
            };
            console.log(action.payload);

            localStorage.setItem("task_items", JSON.stringify(newState));
            return newState;
        }
        case "DELETE_TASK_ITEM": {
            const newState = JSON.parse(JSON.stringify(state));
            delete newState[action.payload];

            localStorage.setItem("task_items", JSON.stringify(newState));
            return newState;
        }
        default:
            return state;
    }
};

export default taskItemsReducer;
