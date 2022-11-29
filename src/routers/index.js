import { Home, Tasks } from "../page";

const routers = [
    { path: "/", component: Home },
    { path: "/tasks/:flag", component: Tasks },
];

export default routers;
