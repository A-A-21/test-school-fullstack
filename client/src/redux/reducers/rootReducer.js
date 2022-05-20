import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({ user: userReducer, lessons:  });

export default rootReducer;
