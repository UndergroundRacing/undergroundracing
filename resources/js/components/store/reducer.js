import {ADD_TOKEN, ADD_USER, ADD_ABILITIES, ADD_CARS, ADD_CAR_INFO, ADD_CAR_SHOP} from "./action_types";

const initialState = {
    token: "",
    user_info: null,
    user_abilities: null,
    user_cars: null,
    user_car_info: null,
    car_shop: null
};

function rootReducer(state = initialState, action) {

    if (action.type === ADD_TOKEN) {
        return {...state, token: action.payload.token};
    } else if (action.type === ADD_USER) {
        return {...state, user_info: action.payload};
    } else if (action.type === ADD_ABILITIES) {
        return {...state, user_abilities: action.payload};
    } else if (action.type === ADD_CARS) {
        return {...state, user_cars: action.payload};
    } else if (action.type === ADD_CAR_INFO) {
        return {...state, user_car_info: action.payload};
    } else if (action.type === ADD_CAR_SHOP) {
        return {...state, car_shop: action.payload};
    }

    return state;
}

export default rootReducer;
