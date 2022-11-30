export const changeItemInMultiList = (payload) => {
    return {
        type: "CHANGE_ITEM_IN_MULTI_LIST",
        payload,
    };
};

export const addNewTask = (payload) => {
    return {
        type: "ADD_NEW_TASK",
        payload,
    };
};

export const addNewTaskList = (payload) => {
    return {
        type: "ADD_NEW_TASK_LIST",
        payload,
    };
};

export const deleteTask = (payload) => {
    return {
        type: "DELETE_TASK",
        payload,
    };
};

export const editTask = (payload) => {
    return {
        type: "EDIT_TASK",
        payload,
    };
};
