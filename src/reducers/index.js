import { combineReducers } from "redux";
import projectReducer from "./project";
import tasksReducer from "./tasks";

const rootReducer = combineReducers({
    project: projectReducer,
    tasks: tasksReducer,
});

export default rootReducer;
