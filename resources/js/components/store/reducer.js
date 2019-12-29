import {ADD_TOKEN} from "./action_types";

const initialState = {
    token: ""
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_TOKEN) {
        return Object.assign({}, state, {
            token: action.payload
        });
    }
    return state;
}

export default rootReducer;
