import {LOGIN, GET_USER, GET_GVDUSER} from '../../actions/actionTypes/auth';

const initialState = {
    user: {}

}

export const authReducer = (state = initialState, action) => {

    switch(action.type){
        case LOGIN:
            break;
        
        case GET_USER:
            return{
              ...state,
              user: action.payload
            };
        case GET_GVDUSER:
            return{
              ...state,
              user: action.payload
            };
        default: 
            return state;
    }
}

