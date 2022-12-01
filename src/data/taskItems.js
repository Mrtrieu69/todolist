import { randomId } from "../utils";

const TASK_ITEMS_DEFAULT = {
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

export default TASK_ITEMS_DEFAULT;
