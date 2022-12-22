import { combineReducers } from 'redux'
import { authReducer } from './auth/authReducer'
import referencesReducer from './references/referencesReducer'
import { uxReducer } from './ux/uxReducer'
import { checklistReducer } from './checklist/checklistReducer'

const initialBase = {
    sidebarShow: true,
    sidebarUnfoldable: false,
}

const baseReducer = (state = initialBase, { type, ...rest }) =>
    type === 'set' ? { ...state, ...rest } : state

export default combineReducers({
    base: baseReducer,
    auth: authReducer,
    references: referencesReducer,
    ux: uxReducer,
    checklist: checklistReducer
})