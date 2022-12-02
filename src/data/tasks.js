const TASKS_DEFAULT = {
    housework: {
        queue: {
            id: "12345",
            status: "queue",
            label: "Queue",
            list: [
                {
                    id: "22635345",
                    task: "Cook rice",
                    createDate: "December 1, 2022 21:30",
                },
                {
                    id: "8678565412",
                    task: "Wash dishes",
                    createDate: "December 1, 2022 20:35",
                },
            ],
        },
        development: {
            id: "11123",
            status: "development",
            label: "Development",
            list: [
                {
                    id: "784628365",
                    task: "Sweep the house",
                    createDate: "December 1, 2022 21:37",
                },
            ],
        },
        done: {
            id: "12344",
            status: "done",
            label: "Done 🙌",
            list: [
                {
                    id: "65978373",
                    task: "Clean the house",
                    createDate: "December 1, 2022 20:23",
                },
            ],
        },
    },
};

export default TASKS_DEFAULT;
