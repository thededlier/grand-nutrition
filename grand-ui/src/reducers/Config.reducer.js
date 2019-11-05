import {SET_IS_OPEN} from "../const";

const initialState = {
    isOpen: false,
    isAuthenticated: true
};

export default function config(state=initialState, action) {
    switch(action.type) {
        case SET_IS_OPEN:
            return ({
                ...state,
                isOpen: action.payload
            });

        default :
            return state
    }
}