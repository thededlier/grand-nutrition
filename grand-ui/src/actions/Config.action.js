import {SET_IS_OPEN} from "../const";

export const setIsOpen = value => {
    return{
        type: SET_IS_OPEN,
        payload: value
    }
};