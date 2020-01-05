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
    ADD_ACTIVE_CAR,
    ADD_TASK,
    RACE_ACTION,
    ADD_PARTS,
    ADMIN_LOGIN,
    GET_USER,
    ADD_PART,
    GET_ALL_PARTS,
    CREATE_CLUB,
    GET_CLUB,
    DESTROY_CLUB,
    REGISTER_CLUB_TO_TOURNAMENT,
    REMOVE_USER_FROM_CLUB,
    GET_CLUB_INVITATIONS,
    JOIN_CLUB,
    GET_TOPS,
    SEARCH_USER,
    INVITE_TO_CLUB,
    SEND_MESSAGE,
    MESSAGE_CONTACTS,
    GET_MESSAGES,
    REGISTER_USER_TO_TOURNAMENT ,
    CHECK_IF_USER_REGISTERED,
    ADD_USER_TASK,
    CHANGE_PASSWORD
} from "./action_types";

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

export const adminLogin = (email, password) => async dispatch => {

    var data = JSON.stringify({
        email: email,
        password: password
    });

    const response = await Apis.post('/adminLogin', data, {
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

    const response = await Apis.post('/getUser', null, {
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

export const addPart = (title, token) => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    var data = {
        title: title
    };
    const response = await Apis.post('/addPart', data, {
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
    const response = await Apis.get('/getAllParts', {
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


export const addParts = (token, data, endpoint) => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    const response = await Apis.post(endpoint, data, {
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

export const raceAction = (token, data) => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    const response = await Apis.post('/doRaceAction', data, {
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

    const response = await Apis.post('/getUser', null, {
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

export const createClub = (token,data) => async dispatch => {
    var auth = 'Bearer ' + token.toString();

    const response = await Apis.post('/createClub', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: CREATE_CLUB,
        payload: response.data
    });
};

export const getClub = (token,userId) => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    var endpoint = "/getClubByUserId/" + userId;
    const response = await Apis.get(endpoint, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: GET_CLUB,
        payload: response.data
    });
};

export const checkIfUserRegisteredToTournament = (token,userId) => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    var endpoint = "/checkIfUserRegisteredToTournament/" + userId;
    const response = await Apis.get(endpoint, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: CHECK_IF_USER_REGISTERED,
        payload: response.data.success
    });
};

export const getClubInvitations = (token,userId) => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    var endpoint = "/getClubInvitations/" + userId;
    const response = await Apis.get(endpoint, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: GET_CLUB_INVITATIONS,
        payload: response.data
    });
};

export const deleteClub = (token,data) => async dispatch => {
    var auth = 'Bearer ' + token.toString();

    const response = await Apis.post('/destroyClub', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: DESTROY_CLUB,
        payload: response.data
    });
};

export const registerClubToTournament = (token,data) => async dispatch => {
    var auth = 'Bearer ' + token.toString();

    const response = await Apis.post('/registerClubToTournament', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: REGISTER_CLUB_TO_TOURNAMENT,
        payload: response.data
    });
};

export const removeUserFromClub = (token,data) => async dispatch => {
    var auth = 'Bearer ' + token.toString();

    const response = await Apis.post('/leaveClub', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: REMOVE_USER_FROM_CLUB,
        payload: response.data
    });
};


export const joinClub = (token,data) => async dispatch => {
    var auth = 'Bearer ' + token.toString();

    const response = await Apis.post('/addUserToClub', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: JOIN_CLUB,
        payload: response.data
    });
};

export const inviteUserToClub = (token,data) => async dispatch => {
    var auth = 'Bearer ' + token.toString();

    const response = await Apis.post('/inviteUserToClub', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: INVITE_TO_CLUB,
        payload: response.data
    });
};


export const sendMessage = (token,data) => async dispatch => {
    var auth = 'Bearer ' + token.toString();

    const response = await Apis.post('/sendMessage', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: SEND_MESSAGE,
        payload: response.data
    });
};

export const registerToUsersTournament = (token,data) => async dispatch => {
    var auth = 'Bearer ' + token.toString();

    const response = await Apis.post('/registerToTournament', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: REGISTER_USER_TO_TOURNAMENT,
        payload: response.data
    });
};

export const getTops = (token) => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    var endpoint = "/getTops";
    const response = await Apis.get(endpoint, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: GET_TOPS,
        payload: response.data.success
    });
};


export const getMessagesContacts = (token,userId) => async dispatch => {
    var auth = 'Bearer ' + token.toString();
    var endpoint = "/getMessagesContacts/" + userId;
    const response = await Apis.get(endpoint, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: MESSAGE_CONTACTS,
        payload: response.data.success
    });
};

export const addUserToSearch = id =>async dispatch => {
    dispatch({
        type: SEARCH_USER,
        payload: id
    });
}

export const getMessages = (token,data) => async dispatch => {
    var auth = 'Bearer ' + token.toString();

    const response = await Apis.post('/getMessages', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: GET_MESSAGES,
        payload: response.data.success
    });
};

export const addUserTask = (token,data) => async dispatch => {
    var auth = 'Bearer ' + token.toString();

    const response = await Apis.post('/addTask', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': auth
        }
    });

    dispatch({
        type: ADD_USER_TASK,
        payload: {task: response.data.success}
    });
};

export const changePassword = (data) => async dispatch => {
    const response = await Apis.post('/changePassword', data, {
        headers: {
            'Accept': 'application/json'
        }
    });

    dispatch({
        type: CHANGE_PASSWORD,
        payload: response.data
    });
};