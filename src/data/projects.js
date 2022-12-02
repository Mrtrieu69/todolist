import { getRandomId, getFlag } from "../utils";

const id = getRandomId();
const flag = getFlag("Homework");

const PROJECTS_DEFAULT = {
    list: [
        {
            id,
            path: `/tasks/${flag}`,
            flag,
            title: "Homework",
            desc: "Homework from the university",
        },
    ],
};

export default PROJECTS_DEFAULT;
