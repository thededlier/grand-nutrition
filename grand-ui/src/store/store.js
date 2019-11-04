import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../reducers/RootReducer";
import thunk from "redux-thunk";
import initialState from "./initialState";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore() {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
}