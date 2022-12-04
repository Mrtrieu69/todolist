const TASKS_DEFAULT = {
    homework: {
        queue: {
            id: "12345",
            status: "queue",
            label: "Queue",
            list: [
                {
                    id: "784628365",
                    task: "Do the 1st lab in computer science",
                    createDate: "December 3, 2022 9:15",
                    endDate: null,
                },
                {
                    id: "8678565412",
                    task: "Learn 30 new words",
                    createDate: "December 5, 2022 00:50",
                    endDate: null,
                },
            ],
        },
        development: {
            id: "11123",
            status: "development",
            label: "Development",
            list: [
                {
                    id: "22635345",
                    task: "Do homework in english",
                    createDate: "December 4, 2022 23:40",
                    endDate: null,
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
                    task: "Write a report on the Internet of things",
                    createDate: "December 4, 2022 19:23",
                    endDate: "December 4, 2022 22:44",
                },
            ],
        },
    },
};

export default TASKS_DEFAULT;
