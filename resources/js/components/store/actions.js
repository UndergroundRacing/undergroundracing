import {RACE_ACTION,ADD_PARTS,ADD_TOKEN, ADD_USER, ADD_ABILITIES, ADD_CARS, ADD_CAR_INFO, ADD_CAR_SHOP,ADMIN_LOGIN,GET_USER,ADD_PART, GET_ALL_PARTS} from "./action_types";
import Apis from '../apis/Apis';

export function addToken(payload) {
    return {
        type: ADD_TOKEN,
         payload
    };
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

export const raceAction = (token,data) => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    const response = await Apis.post('/doRaceAction',data,{
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: RACE_ACTION,
        payload: response.data.success
    });
};

export const getPlayer = token => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    
    const response = await Apis.post('/getUser',null,{
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });
    
    dispatch({
        type: ADD_USER,
        payload: {user: response.data.success}
    });
};