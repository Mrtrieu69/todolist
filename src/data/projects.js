import { randomId, getFlag } from "../utils";

const id = randomId();
const flag = getFlag("Housework");

const PROJECTS_DEFAULT = {
    list: [
        {
            id,
            path: `/tasks/${flag}`,
            flag,
            title: "Housework",
            desc: "Housework by Mom",
        },
    ],
};

export default PROJECTS_DEFAULT;
