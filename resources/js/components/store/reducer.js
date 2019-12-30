import {ADD_TOKEN, ADD_USER, ADD_ABILITIES} from "./action_types";

const initialState = {
    token: "",
    user_info: null,
    user_abilities: null
};

function rootReducer(state = initialState, action) {

    if (action.type === ADD_TOKEN) {
        return {...state, token: action.payload.token};
    } else if (action.type === ADD_USER) {
        return {...state, user_info: action.payload};
    } else if (action.type === ADD_ABILITIES) {
        return {...state, user_abilities: action.payload};
    }

    return state;
}

export default rootReducer;
