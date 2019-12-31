import {ADD_TOKEN, ADD_USER, ADD_ABILITIES, ADD_CARS, ADD_CAR_INFO, ADD_CAR_SHOP} from "./action_types";

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

