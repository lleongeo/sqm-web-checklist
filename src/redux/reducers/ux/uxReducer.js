import { UX_SET_LANGUAGE, UX_SET_MENURAW } from '../../actions/actionTypes/ux';

const initialState = {
    language: "ES",
    menu: []
}

export const uxReducer = (state = initialState, action) => {

    switch (action.type) {

        case UX_SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            };
        case UX_SET_MENURAW:
            return {
                ...state,
                menu: action.payload
            };
        default:
            return state;
    }
}

