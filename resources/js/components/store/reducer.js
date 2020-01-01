import {ADD_WHEELS,ADD_TOKEN, ADD_USER, ADD_ABILITIES, ADD_CARS, ADD_CAR_INFO, ADD_CAR_SHOP,ADMIN_LOGIN,GET_USER,ADD_PART,GET_ALL_PARTS, ADD_PARTS} from "./action_types";

const initialState = {
    token: "",
    adminToken: null,
    user_info: null,
    user_abilities: null,
    user_cars: null,
    user_car_info: [],
    user: null,
    part:null,
    allPars:null,
    engine:null,
    nos:null,
    wheels:null,
    vechile:null,
    added_part:null,
    car_shop: null
};

function rootReducer(state = initialState, action) {

    switch(action.type){
        case ADD_TOKEN:
            return {...state, token: action.payload.token};
        case ADD_USER:
            return {...state, user_info: action.payload};
        case ADD_ABILITIES:
            return {...state, user_abilities: action.payload};
        case ADD_CARS:
            return {...state, user_cars: action.payload};
        case ADD_CAR_INFO:
            return {...state, user_car_info: state.user_car_info.concat(action.payload)};
        case ADD_CAR_SHOP:
            return {...state, car_shop: action.payload};
        case ADMIN_LOGIN:
            return {...state, adminToken:action.payload};
        case GET_USER:
            return {...state, user:action.payload};
        case ADD_PART:
            return {...state, part:action.payload};
        case GET_ALL_PARTS:
            return {...state, allParts:action.payload};
        case ADD_PARTS:
            return {...state, added_part:action.payload};
        default:
            return state;
    }
}
export default rootReducer;
