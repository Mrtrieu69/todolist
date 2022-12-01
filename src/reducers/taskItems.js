import { TASK_ITEMS_DEFAULT } from "../data";

const taskItemsFromLocalStorage = JSON.parse(
    localStorage.getItem("task_items")
);

const taskItemsReducer = (
    state = taskItemsFromLocalStorage || TASK_ITEMS_DEFAULT,
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

        case "UPDATE_SUB_TASK_ITEM": {
            const { idTaskItem, index, value, status } = action.payload;

            const taskItem = state[idTaskItem];
            const newSubTaskItems = taskItem.subTaskItems;

            newSubTaskItems[index].subTask = value;
            newSubTaskItems[index].status = status;

            return {
                ...state,
                [idTaskItem]: {
                    ...state[idTaskItem],
                    subTaskItems: newSubTaskItems,
                },
            };
        }

        case "UPDATE_STATUS_SUB_TASK_ITEM": {
            console.log(action.payload);
            const { idTaskItem, index, status } = action.payload;

            const taskItem = state[idTaskItem];
            const newSubTaskItems = taskItem.subTaskItems;

            newSubTaskItems[index].status = status;

            return {
                ...state,
                [idTaskItem]: {
                    ...state[idTaskItem],
                    subTaskItems: newSubTaskItems,
                },
            };
        }

        case "DELETE_SUB_TASK_ITEM": {
            const { idTaskItem, index } = action.payload;

            const taskItem = state[idTaskItem];
            const newSubTaskItems = taskItem.subTaskItems;
            newSubTaskItems.splice(index, 1);
            console.log(newSubTaskItems);

            return {
                ...state,
                [idTaskItem]: {
                    ...state[idTaskItem],
                    subTaskItems: newSubTaskItems,
                },
            };
        }

        case "ADD_SUB_TASK_ITEM": {
            const { idTaskItem, value, status, id } = action.payload;

            const taskItem = state[idTaskItem];
            const newSubTaskItems = taskItem.subTaskItems;
            newSubTaskItems.push({ subTask: value, status, id });

            return {
                ...state,
                [idTaskItem]: {
                    ...state[idTaskItem],
                    subTaskItems: newSubTaskItems,
                },
            };
        }

        default:
            return state;
    }
};

export default taskItemsReducer;
