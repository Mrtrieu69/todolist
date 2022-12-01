const TASKS_DEFAULT = {
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

export default TASKS_DEFAULT;
