import { SET_FILTER_PARAMS, SET_DATASOURCE_GRID } from "../../actions/actionTypes/checklist";
import { emptyStringValidation } from "../../../components/shared/Grid/Helper/validations";

const initialState = {
    datasource: {
        url: {
           read: "CheckListDetailsCrud",
           create: "CheckListDetailsCrud",
           update: "CheckListDetailsCrud",
           destroy: "CheckListDetailsCrud"
        },
        model: {
           id: "idCheckListDetails",
           fields: {
              idCheckListDetails: { type: "number", editable: false, nullable: true },
              idTarjeta: { type: "string", editable: false },
              locked: { type: "boolean", editable: false },
              idCheckListMaster: { type: "number", editable: false },
              idPallet: { type: "number", editable: true, validation: { min: 0 } },
              idDefecto: { type: "number", editable: true },
              nroTarjeta:{
                 type: "number", editable: true,
                 validation: {
                    min: 0,
                    required: true,
                    emptyStringValidation: input => emptyStringValidation(input)
                 }
              }, 
              idLocalizacion: { type: "number", editable: true },
              idPosicionBodega: { type: "number", editable: true },
              idCondicion: { type: "number", editable: true },
              observaciones: { type: "string", editable: true },
              fechaCreacion: { type: "date", editable: false },
              imagenes: { type: "string", editable: false },
              idLote: { type: "string", editable: false },
              fechaIngreso: { type: "string", editable: false },
           }
        },
        render: false
    
     },

}

export const checklistReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_FILTER_PARAMS:
 
            return{
              ...state,
              datasource: {...state.datasource, filter:{...state.datasource.filter ,...action.payload}}
            };
        case SET_DATASOURCE_GRID:
            return{
              ...state,
              datasource: {...state.datasource, render: true}
            };
        default: 
            return state;
    }
}

