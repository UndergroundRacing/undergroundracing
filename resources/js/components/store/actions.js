import {
    ADD_TOKEN,
    ADD_USER,
    ADD_ABILITIES,
    ADD_CARS,
    ADD_CAR_INFO,
    ADD_CAR_SHOP,
    ADD_ENGINE_SHOP, ADD_TURBO_SHOP, ADD_TIRES_SHOP, ADD_BRAKES_SHOP, ADD_NITROUS_SHOP, CLEAR_CAR_INFO, CLEAR_USER_CARS
} from "./action_types";

export function addToken(payload) {
    return {type: ADD_TOKEN, payload};
}

export function addUser(payload) {
    return {type: ADD_USER, payload};
}

export function addAbilities(payload) {
    return {type: ADD_ABILITIES, payload};
}

export function addCars(payload) {
    return {type: ADD_CARS, payload};
}

export function addCarInfo(payload) {
    return {type: ADD_CAR_INFO, payload};
}

export function addCarShop(payload) {
    return {type: ADD_CAR_SHOP, payload};
}

export function addEngineShop(payload) {
    return {type: ADD_ENGINE_SHOP, payload};
}

export function addTurboShop(payload) {
    return {type: ADD_TURBO_SHOP, payload};
}

export function addTireShop(payload) {
    return {type: ADD_TIRES_SHOP, payload};
}

export function addBrakesShop(payload) {
    return {type: ADD_BRAKES_SHOP, payload};
}

export function addNitrousShop(payload) {
    return {type: ADD_NITROUS_SHOP, payload};
}

export function clearUserCars(payload) {
    return {type: CLEAR_USER_CARS, payload};
}

export function clearUserCarInfo(payload) {
    return {type: CLEAR_CAR_INFO, payload};
}
