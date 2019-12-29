import {ADD_TOKEN} from "./action_types";

export function addToken(payload) {
    return {type: ADD_TOKEN, payload};
}
