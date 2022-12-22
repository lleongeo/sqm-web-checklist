import { SET_FILTER_PARAMS, SET_DATASOURCE_GRID } from "../actionTypes/checklist";

export const SetParamsAction = payload => ({
    type: SET_FILTER_PARAMS,
    payload
});

export const SetDataSourceAction = () => ({
    type: SET_DATASOURCE_GRID,
    
});
