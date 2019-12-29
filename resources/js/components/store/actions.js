import {ADD_TOKEN, ADD_USER} from "./action_types";

export function addToken(payload) {
    return {type: ADD_TOKEN, payload};
}

export function addUser(payload){
    return {type: ADD_USER, payload};
}
