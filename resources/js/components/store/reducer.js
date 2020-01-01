import {
    ADD_TOKEN,
    ADD_USER,
    ADD_ABILITIES,
    ADD_CARS,
    ADD_CAR_INFO,
    ADD_CAR_SHOP,
    ADD_ENGINE_SHOP,
    ADD_TURBO_SHOP,
    ADD_BRAKES_SHOP,
    ADD_TIRES_SHOP,
    ADD_NITROUS_SHOP,
    CLEAR_CAR_INFO,
    CLEAR_USER_CARS,
    ADD_ACTIVE_CAR, ADD_TASK
} from "./action_types";

const initialState = {
    token: "",
    user_info: null,
    user_abilities: null,
    user_task: null,
    user_cars: null,
    user_car_info: [],
    active_car: null,
    car_shop: null,
    part_shop: {
        engines: null,
        turbos: null,
        tires: null,
        brakes: null,
        nitrous: null
    }
};

function rootReducer(state = initialState, action) {

    if (action.type === ADD_TOKEN) {
        return {...state, token: action.payload.token};
    } else if (action.type === ADD_USER) {
        return {...state, user_info: action.payload};
    } else if (action.type === ADD_ABILITIES) {
        return {...state, user_abilities: action.payload};
    } else if (action.type === ADD_TASK) {
        return {...state, user_task: action.payload};
    } else if (action.type === ADD_CARS) {
        return {...state, user_cars: action.payload};
    } else if (action.type === CLEAR_USER_CARS) {
        return {...state, user_cars: []};
    } else if (action.type === ADD_CAR_INFO) {
        return {...state, user_car_info: state.user_car_info.concat(action.payload)};
    } else if (action.type === CLEAR_CAR_INFO) {
        return {...state, user_car_info: []};
    } else if (action.type === ADD_ACTIVE_CAR) {
        return {...state, active_car: action.payload};
    } else if (action.type === ADD_CAR_SHOP) {
        return {...state, car_shop: action.payload};
    } else if (action.type === ADD_ENGINE_SHOP) {
        return {
            ...state, part_shop: {
                engines: action.payload,
                turbos: state.part_shop.turbos,
                brakes: state.part_shop.brakes,
                tires: state.part_shop.tires,
                nitrous: state.part_shop.nitrous
            }
        };
    } else if (action.type === ADD_TURBO_SHOP) {
        return {
            ...state, part_shop: {
                engines: state.part_shop.engines,
                turbos: action.payload,
                brakes: state.part_shop.brakes,
                tires: state.part_shop.tires,
                nitrous: state.part_shop.nitrous
            }
        };
    } else if (action.type === ADD_BRAKES_SHOP) {
        return {
            ...state, part_shop: {
                brakes: action.payload,
                engines: state.part_shop.engines,
                turbos: state.part_shop.turbos,
                tires: state.part_shop.tires,
                nitrous: state.part_shop.nitrous
            }
        };
    } else if (action.type === ADD_TIRES_SHOP) {
        return {
            ...state, part_shop: {
                tires: action.payload,
                engines: state.part_shop.engines,
                turbos: state.part_shop.turbos,
                brakes: state.part_shop.brakes,
                nitrous: state.part_shop.nitrous
            }
        };
    } else if (action.type === ADD_NITROUS_SHOP) {
        return {
            ...state, part_shop: {
                nitrous: action.payload,
                engines: state.part_shop.engines,
                turbos: state.part_shop.turbos,
                brakes: state.part_shop.brakes,
                tires: state.part_shop.tires
            }
        };
    }

    return state;
}

export default rootReducer;
