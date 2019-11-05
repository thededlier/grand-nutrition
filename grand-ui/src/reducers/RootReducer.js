import {combineReducers} from "redux";
import config from "./Config.reducer";

const rootReducer = combineReducers({
    config: config
});

export default rootReducer;