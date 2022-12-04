import { getRandomId } from "../utils";

const TASK_ITEMS_DEFAULT = {
    784628365: {
        comments: [
            {
                id: getRandomId(),
                text: "It's in the shared folder of the group",
                createDate: "December 3, 2022 11:45:23",
                replies: [],
            },
        ],
        subTaskItems: [],
    },
    8678565412: {
        comments: [],
        subTaskItems: [],
    },
    22635345: {
        comments: [
            {
                id: getRandomId(),
                text: "Could'n do the 23rd exercise",
                createDate: "December 4, 2022 23:45:23",
                replies: [
                    {
                        id: getRandomId(),
                        text: "Found a solution in VK",
                        createDate: "December 4, 2022 23:50:10",
                    },
                    {
                        id: getRandomId(),
                        text: "Done!",
                        createDate: "December 4, 2022 23:55:10",
                    },
                ],
            },
        ],
        subTaskItems: [
            { id: getRandomId(), subTask: "Do exercise 23, 24 (page 92)", status: true },
            { id: getRandomId(), subTask: "Rewrite new words 10 times", status: false },
        ],
    },
    65978373: {
        comments: [],
        subTaskItems: [
            { id: getRandomId(), subTask: "Definition of IoT", status: false },
            {
                id: getRandomId(),
                subTask: "How the IoT works",
                status: false,
            },
            {
                id: getRandomId(),
                subTask: "Application in life",
                status: false,
            },
        ],
    },
};

export default TASK_ITEMS_DEFAULT;
