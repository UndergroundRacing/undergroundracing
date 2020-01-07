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
    ADD_ACTIVE_CAR, ADD_TASK,
    ADMIN_LOGIN, GET_USER, ADD_PART, GET_ALL_PARTS, ADD_PARTS,
    RACE_ACTION, ADD_WHEELS,
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
    REGISTER_USER_TO_TOURNAMENT,
    CHECK_IF_USER_REGISTERED,
    ADD_USER_TASK,
    CHANGE_PASSWORD, CLEAR_STORE
} from "./action_types";

const initialState = {
    token: "",
    adminToken: null,
    user_info: null,
    user_abilities: null,
    user_task: null,
    user_cars: null,
    user_car_info: [],
    user: null,
    part: null,
    allPars: null,
    engine: null,
    nos: null,
    wheels: null,
    vechile: null,
    added_part: null,
    active_car: null,
    car_shop: null,
    part_shop: {
        engines: null,
        turbos: null,
        tires: null,
        brakes: null,
        nitrous: null
    },
    race: null,
    club: null,
    user_remove_club: null,
    club_tournament: null,
    club_invitations: null,
    tops: null,
    userToSearch: '',
    invitation_to_club: null,
    sended_message: null,
    message_contacts: null,
    messages: null,
    tournament: null,
    user_tournament_status: 0,
    change_password: null
};

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_TOKEN:
            return {...state, token: action.payload.token};
        case ADD_USER:
            return {...state, user_info: action.payload};
        case ADD_ABILITIES:
            return {...state, user_abilities: action.payload};
        case ADD_TASK:
            return {...state, user_task: action.payload};
        case ADD_CARS:
            return {...state, user_cars: action.payload};
        case CLEAR_USER_CARS:
            return {...state, user_cars: []};
        case ADD_CAR_INFO:
            return {...state, user_car_info: state.user_car_info.concat(action.payload)};
        case CLEAR_CAR_INFO:
            return {...state, user_car_info: []};
        case CLEAR_STORE:
            return {
                ...state,
                token: "",
                user_info: null,
                user_abilities: null,
                user_task: null,
                user_cars: null,
                user_car_info: [],
                active_car: null
            };
        case ADD_ACTIVE_CAR:
            return {...state, active_car: action.payload};
        case ADD_CAR_SHOP:
            return {...state, car_shop: action.payload};
        case ADD_ENGINE_SHOP:
            return {
                ...state, part_shop: {
                    engines: action.payload,
                    turbos: state.part_shop.turbos,
                    brakes: state.part_shop.brakes,
                    tires: state.part_shop.tires,
                    nitrous: state.part_shop.nitrous
                }
            };
        case ADD_TURBO_SHOP:
            return {
                ...state, part_shop: {
                    engines: state.part_shop.engines,
                    turbos: action.payload,
                    brakes: state.part_shop.brakes,
                    tires: state.part_shop.tires,
                    nitrous: state.part_shop.nitrous
                }
            };
        case ADD_BRAKES_SHOP:
            return {
                ...state, part_shop: {
                    brakes: action.payload,
                    engines: state.part_shop.engines,
                    turbos: state.part_shop.turbos,
                    tires: state.part_shop.tires,
                    nitrous: state.part_shop.nitrous
                }
            };
        case ADD_TIRES_SHOP:
            return {
                ...state, part_shop: {
                    tires: action.payload,
                    engines: state.part_shop.engines,
                    turbos: state.part_shop.turbos,
                    brakes: state.part_shop.brakes,
                    nitrous: state.part_shop.nitrous
                }
            };
        case ADD_NITROUS_SHOP:
            return {
                ...state, part_shop: {
                    nitrous: action.payload,
                    engines: state.part_shop.engines,
                    turbos: state.part_shop.turbos,
                    brakes: state.part_shop.brakes,
                    tires: state.part_shop.tires
                }
            };
        case ADMIN_LOGIN:
            return {...state, adminToken: action.payload};
        case GET_USER:
            return {...state, user: action.payload};
        case ADD_PART:
            return {...state, part: action.payload};
        case GET_ALL_PARTS:
            return {...state, allParts: action.payload};
        case ADD_PARTS:
            return {...state, added_part: action.payload};
        case RACE_ACTION:
            return {...state, race: action.payload};
        case CREATE_CLUB:
            return {...state, club: action.payload};
        case GET_CLUB:
            return {...state, club: action.payload};
        case DESTROY_CLUB:
            return {...state, club: action.payload};
        case REGISTER_CLUB_TO_TOURNAMENT:
            return {...state, club_tournament: action.payload};
        case REMOVE_USER_FROM_CLUB:
            return {...state, user_remove_club: action.payload};
        case GET_CLUB_INVITATIONS:
            return {...state, club_invitations: action.payload};
        case JOIN_CLUB:
            return {...state, club: action.payload};
        case GET_TOPS:
            return {...state, tops: action.payload};
        case SEARCH_USER:
            return {...state, userToSearch: action.payload};
        case INVITE_TO_CLUB:
            return {...state, invitation_to_club: action.payload};
        case SEND_MESSAGE:
            return {...state, sended_message: action.payload};
        case MESSAGE_CONTACTS:
            return {...state, message_contacts: action.payload};
        case GET_MESSAGES:
            return {...state, messages: action.payload};
        case REGISTER_USER_TO_TOURNAMENT:
            return {...state, tournament: action.payload};
        case CHECK_IF_USER_REGISTERED:
            return {...state, user_tournament_status: action.payload};
        case ADD_USER_TASK:
            return {...state, user_task: action.payload};
        case CHANGE_PASSWORD:
            return {...state, change_password: action.payload};
        default:
            return state;
    }
}


export default rootReducer;
