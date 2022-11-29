export const addNewProject = (payload) => {
    return {
        type: "ADD_PROJECT",
        payload,
    };
};

export const deleteProject = (payload) => {
    return {
        type: "DELETE_PROJECT",
        payload,
    };
};
