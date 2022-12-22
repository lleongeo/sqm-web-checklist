import * as p from '../../actions/actionTypes/references/referencesTypes';

const initialState = {
  localizaciones: [],
  bodegas: [],
  productos: [],
  condiciones: [],
  envases: [],
  defectos: [],
  posicionesBodega: [],
  usuarios: [],
  transportistas: [],
  lugarRevisiones: [],
  tipoContenedores: [],
  contenedoresStatus: [],
  personalApoyo: [],
  personalApoyoPerfil: []
}

const referencesReducer = (state = initialState, action) => {

  switch (action.type) {

    case p.READ_LOCALIZACIONES_OK:
      return {
        ...state,
        localizaciones: action.payload
      };
    case p.READ_BODEGAS_OK:
      return {
        ...state,
        bodegas: action.payload
      };
    case p.READ_POSICIONES_BODEGAS_OK:
      return {
        ...state,
        posicionesBodega: action.payload
      };
    case p.READ_PRODUCTOS_OK:
      return {
        ...state,
        productos: action.payload
      };
    case p.READ_CONDICIONES_OK:
      return {
        ...state,
        condiciones: action.payload
      };
    case p.READ_ENVASES_OK:
      return {
        ...state,
        envases: action.payload
      };
    case p.READ_DEFECTOS_OK:
      return {
        ...state,
        defectos: action.payload
      };
    case p.READ_USUARIOS_OK:
      return {
        ...state,
        usuarios: action.payload
      };
    case p.READ_TRANSPORTISTAS_OK:
      return {
        ...state,
        transportistas: action.payload
      };
    case p.READ_LUGARREVISIONES_OK:
      return {
        ...state,
        lugarRevisiones: action.payload
      };
    case p.READ_TIPOCONTENEDORES_OK:
      return {
        ...state,
        tipoContenedores: action.payload
      };
    case p.READ_CONTENEDORESESTATUSES_OK:
      return {
        ...state,
        contenedoresStatus: action.payload
      };
    case p.READ_PERSONALAPOYOPERFILES_OK:
      return {
        ...state,
        personalApoyoPerfiles: action.payload
      };
    case p.READ_PERSONALAPOYOS_OK:
      return {
        ...state,
        personalApoyo: action.payload
      };
    default:
      return state;
  }
}

export default referencesReducer;
