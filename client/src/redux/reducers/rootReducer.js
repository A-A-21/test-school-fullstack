import { combineReducers } from "redux";
import userReducer from "./userReducer";
import lessonsReducer from "./lessonsReducer";

const rootReducer = combineReducers({ user: userReducer, lessons: lessonsReducer });

export default rootReducer;
