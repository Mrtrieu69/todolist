import { TASK_ITEMS_DEFAULT } from "../data";

const taskItemsFromLocalStorage = JSON.parse(localStorage.getItem("task_items"));

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

        case "ADD_COMMENT": {
            const { idTaskItem, ...comment } = action.payload;
            const taskItem = state[idTaskItem];
            taskItem.comments.push(comment);

            return {
                ...state,
                [idTaskItem]: taskItem,
            };
        }

        case "ADD_REPLY_COMMENT": {
            const { idTaskItem, idComment, reply } = action.payload;
            const taskItem = state[idTaskItem];
            const currentComment = taskItem.comments.find(
                (comment) => comment.id === idComment
            );

            currentComment.replies.push(reply);

            return {
                ...state,
                [idTaskItem]: {
                    ...state[idTaskItem],
                    comments: taskItem.comments,
                },
            };
        }

        case "DELETE_COMMENT": {
            const { idTaskItem, id } = action.payload;
            const newComments = state[idTaskItem].comments.filter(
                (comment) => comment.id !== id
            );

            return {
                ...state,
                [idTaskItem]: {
                    ...state[idTaskItem],
                    comments: newComments,
                },
            };
        }

        case "DELETE_REPLY_COMMENT": {
            const { idComment, idTaskItem, id } = action.payload;
            const taskItem = state[idTaskItem];
            const currentComment = taskItem.comments.find(
                (comment) => comment.id === idComment
            );
            const indexCurrentComment = taskItem.comments.findIndex(
                (comment) => comment.id === idComment
            );

            const newReplies = currentComment.replies.filter((reply) => reply.id !== id);
            const newComment = { ...currentComment, replies: newReplies };
            taskItem.comments.splice(indexCurrentComment, 1, newComment);

            return {
                ...state,
                [idTaskItem]: {
                    ...state[idTaskItem],
                    comments: taskItem.comments,
                },
            };
        }

        default:
            return state;
    }
};

export default taskItemsReducer;
