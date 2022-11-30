import { randomId } from "../utils";

const initialState = {
    housework: {
        queue: {
            id: "12345",
            status: "queue",
            label: "Queue",
            list: [
                { id: "22635345", task: "Cook rice" },
                { id: "8678565412", task: "Wash dishes" },
            ],
        },
        development: {
            id: "11123",
            status: "development",
            label: "Development",
            list: [{ id: "784628365", task: "Sweep the house" }],
        },
        done: {
            id: "12344",
            status: "done",
            label: "Done 🙌",
            list: [{ id: "65978373", task: "Clean the house" }],
        },
    },
};

const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

const tasksReducer = (
    state = tasksFromLocalStorage || initialState,
    action
) => {
    switch (action.type) {
        case "CHANGE_ITEM_IN_MULTI_LIST": {
            const { flag, taskList, source, destination } = action.payload;

            if (source.droppableId !== destination.droppableId) {
                const sourceColumn = taskList[source.droppableId];
                const destColumn = taskList[destination.droppableId];
                const sourceList = sourceColumn.list;
                const destList = destColumn.list;
                const [removed] = sourceList.splice(source.index, 1);
                destList.splice(destination.index, 0, removed);
                return {
                    ...state,
                    [flag]: {
                        ...taskList,
                        [source.droppableId]: {
                            ...sourceColumn,
                            list: sourceList,
                        },
                        [destination.droppableId]: {
                            ...destColumn,
                            list: destList,
                        },
                    },
                };
            } else {
                const column = taskList[source.droppableId];
                const copiedItems = [...column.list];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);
                return {
                    ...state,
                    [flag]: {
                        ...taskList,
                        [source.droppableId]: {
                            ...column,
                            list: copiedItems,
                        },
                    },
                };
            }
        }
        case "ADD_NEW_TASK": {
            const { flag, idList, task } = action.payload;
            const newList = state[flag][idList].list;
            newList.push(task);

            return {
                ...state,
                [flag]: {
                    ...state[flag],
                    [idList]: {
                        ...state[flag][idList],
                        list: newList,
                    },
                },
            };
        }

        case "ADD_NEW_TASK_LIST": {
            const flag = action.payload;
            const newState = JSON.parse(JSON.stringify(state));
            newState[flag] = {
                queue: {
                    id: randomId(),
                    status: "queue",
                    label: "Queue",
                    list: [],
                },
                development: {
                    id: randomId(),
                    status: "development",
                    label: "Development",
                    list: [],
                },
                done: {
                    id: randomId(),
                    status: "done",
                    label: "Done 🙌",
                    list: [],
                },
            };

            return newState;
        }

        case "DELETE_TASK": {
            const { flag, idList, id } = action.payload;
            const newList = state[flag][idList].list.filter(
                (item) => item.id !== id
            );

            return {
                ...state,
                [flag]: {
                    ...state[flag],
                    [idList]: {
                        ...state[flag][idList],
                        list: newList,
                    },
                },
            };
        }

        case "EDIT_TASK": {
            const { flag, idList, index, value } = action.payload;
            const newList = [...state[flag][idList].list];
            const item = state[flag][idList].list[index];
            const newItem = { ...item, task: value };

            newList.splice(index, 1, newItem);

            return {
                ...state,
                [flag]: {
                    ...state[flag],
                    [idList]: {
                        ...state[flag][idList],
                        list: newList,
                    },
                },
            };
        }
        default:
            return state;
    }
};

export default tasksReducer;
