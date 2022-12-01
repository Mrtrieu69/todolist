export const addNewTaskItem = (payload) => {
    return {
        type: "ADD_NEW_TASK_ITEM",
        payload,
    };
};

export const deleteTaskItem = (payload) => {
    return {
        type: "DELETE_TASK_ITEM",
        payload,
    };
};
