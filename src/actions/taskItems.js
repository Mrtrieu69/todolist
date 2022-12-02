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

export const updateSubTaskItem = (payload) => {
    return {
        type: "UPDATE_SUB_TASK_ITEM",
        payload,
    };
};

export const updateStatusSubTaskItem = (payload) => {
    return {
        type: "UPDATE_STATUS_SUB_TASK_ITEM",
        payload,
    };
};

export const deleteSubTaskItem = (payload) => {
    return {
        type: "DELETE_SUB_TASK_ITEM",
        payload,
    };
};

export const addSubTaskItem = (payload) => {
    return {
        type: "ADD_SUB_TASK_ITEM",
        payload,
    };
};

export const addComment = (payload) => {
    return {
        type: "ADD_COMMENT",
        payload,
    };
};

export const addReplyComment = (payload) => {
    return {
        type: "ADD_REPLY_COMMENT",
        payload,
    };
};

export const deleteComment = (payload) => {
    return {
        type: "DELETE_COMMENT",
        payload,
    };
};

export const deleteReplyComment = (payload) => {
    return {
        type: "DELETE_REPLY_COMMENT",
        payload,
    };
};
