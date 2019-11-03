import {ADD_USER} from "../const";

export const addUser = user => {
    return{
        type: ADD_USER,
        payload: user
    }
};