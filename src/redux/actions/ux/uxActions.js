import {UX_SET_LANGUAGE, UX_SET_MENURAW} from '../actionTypes/ux/index';

//Async
const setLanguage = lang => ({
    type: UX_SET_LANGUAGE,
    payload: lang
});

const setMenuRaw = menu => ({
    type: UX_SET_MENURAW,
    payload: menu
})


export {
    setLanguage,
    setMenuRaw
}