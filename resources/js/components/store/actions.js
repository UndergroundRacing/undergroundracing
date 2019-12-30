import {ADD_TOKEN, ADD_USER, ADD_ABILITIES} from "./action_types";

export function addToken(payload) {
    return {type: ADD_TOKEN, payload};
}

export function addUser(payload) {
    return {type: ADD_USER, payload};
}

export function addAbilities(payload) {
    return {type: ADD_ABILITIES, payload};
}
