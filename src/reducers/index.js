import { combineReducers } from "redux";
import projectReducer from "./project";
import tasksReducer from "./tasks";
import taskItemsReducer from "./taskItems";

const rootReducer = combineReducers({
    projects: projectReducer,
    tasks: tasksReducer,
    taskItems: taskItemsReducer,
});

export default rootReducer;
