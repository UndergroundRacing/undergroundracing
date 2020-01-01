import {
    ADD_TOKEN,
    ADD_USER,
    ADD_ABILITIES,
    ADD_CARS,
    ADD_CAR_INFO,
    ADD_CAR_SHOP,
    ADD_ENGINE_SHOP,
    ADD_TURBO_SHOP,
    ADD_TIRES_SHOP,
    ADD_BRAKES_SHOP,
    ADD_NITROUS_SHOP,
    CLEAR_CAR_INFO,
    CLEAR_USER_CARS,
    ADD_ACTIVE_CAR, ADD_TASK
} from "./action_types";
import {ADMIN_LOGIN,GET_USER,ADD_PART, GET_ALL_PARTS} from "./action_types";
import Apis from '../apis/Apis';

export function addToken(payload) {
    return {type: ADD_TOKEN, payload};
}

export function addUser(payload) {
    return {type: ADD_USER, payload};
}

export function addAbilities(payload) {
    return {type: ADD_ABILITIES, payload};
}

export function addTask(payload) {
    return {type: ADD_TASK, payload};
}

export function addCars(payload) {
    return {type: ADD_CARS, payload};
}

export function addCarInfo(payload) {
    return {type: ADD_CAR_INFO, payload};
}

export function addActiveCar(payload) {
    return {type: ADD_ACTIVE_CAR, payload};
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
export const adminLogin = (email,password) => async dispatch => {

    var data = JSON.stringify({
        email: email,
        password: password
    });

    const response = await Apis.post('/adminLogin',data,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    dispatch({
        type: ADMIN_LOGIN,
        payload: response.data.success.token
    });
};

export const getUser = token => async dispatch => {
    var auth = 'Bearer ' + token.toString();

    const response = await Apis.post('/getUser',null,{
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: GET_USER,
        payload: response.data.success
    });
};

export const addPart = (title,token) => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    var data = {
        title: title
    };
    const response = await Apis.post('/addPart',data,{
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: ADD_PART,
        payload: response.data
    });
};

export const getAllParts = (token) => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    const response = await Apis.get('/getAllParts',{
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: GET_ALL_PARTS,
        payload: response.data.success
    });
};


export const addParts = (token,data,endpoint) => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    const response = await Apis.post(endpoint,data,{
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: ADD_PARTS,
        payload: response.data.success
    });
};


