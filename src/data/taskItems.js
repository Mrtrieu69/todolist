import { randomId } from "../utils";

const TASK_ITEMS_DEFAULT = {
    22635345: {
        comments: [
            {
                id: randomId(),
                text: "The first comment..",
                createDate: "December 1, 2022 21:45:23",
                replies: [
                    {
                        id: randomId(),
                        text: "Test sub comment",
                        createDate: "December 1, 2022 21:50:10",
                    },
                    {
                        id: randomId(),
                        text: "Test sub comment 2",
                        createDate: "December 1, 2022 21:55:10",
                    },
                ],
            },
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
        comments: [
            {
                id: randomId(),
                text: "The first comment..",
                createDate: "December 1, 2022 21:45:23",
                replies: [],
            },
        ],
        subTaskItems: [],
    },
    65978373: {
        comments: [],
        subTaskItems: [
            { id: randomId(), subTask: "Test sub task", status: false },
            { id: randomId(), subTask: "Test sub task 2", status: false },
        ],
    },
};

export default TASK_ITEMS_DEFAULT;
