import * as r from "../actionTypes/references/referencesTypes"
import {GetDataCombobox} from "../../../service/http"


//Async

const GetLocalizacionesAction =  () => {
    return async dispatch => {
        var localizaciones =  await GetDataCombobox("localizaciones", "localizacion", "idLocalizacion");
        dispatch(GetLocalizacionRefOk(localizaciones));
    }
}

const GetBodegasAction =  () => {
    return async dispatch => {
        var bodegas =  await GetDataCombobox("bodegas", "bodega", "idBodega");
        dispatch(GetBodegasRefOk(bodegas));
    }
};

const GetPosicionesBodegaAction =  () => {
    return async dispatch => {
        var posicionesBodega =  await GetDataCombobox("posicionesbodegas", "posicion", "idPosicionBodega");
        dispatch(GetPosicionesBodegaRefOk(posicionesBodega));
    }
};

const GetCondicionesAction =  () => {
    return async dispatch => {
        var condiciones =  await GetDataCombobox("condiciones", "condicion", "idCondicion");
        dispatch(GetCondicionesRefOk(condiciones));
    }
};

const GetEnvasesAction =  () => {
    return async dispatch => {

        var envases =  await GetDataCombobox("envases", "envase", "idEnvase");
        dispatch(GetEnvasesRefOk(envases));
    }
};

const GetProductosAction =  () => {
    return async dispatch => {

        var productos =  await GetDataCombobox("productos", "producto", "idProducto");
        dispatch(GetProductosRefOk(productos));
    }
};

const GetDefectosAction =  () => {
    return async dispatch => {
        var defectos =  await GetDataCombobox("defectos", "defecto", "idDefecto");
        dispatch(GetDefectosRefOk(defectos));
    }
};

const GetUsuariosAction =  () => {
  return async dispatch => {
      var usuarios =  await GetDataCombobox("usuarios", "email", "idUsuario");
      dispatch(GetUsuariosRefOk(usuarios));
  }
};

const GetTransportistasAction =  () => {
  return async dispatch => {
      var transportistas =  await GetDataCombobox("transportistas", "name", "id");
      dispatch(GetTransportistasRefOk(transportistas));
  }
};

const GetLugarRevisionesAction =  () => {
  return async dispatch => {
      var lugarRevisiones =  await GetDataCombobox("lugarRevisiones", "name", "id");
      dispatch(GetLugarRevisionesRefOk(lugarRevisiones));
  }
};

const GetTipoContenedoresAction =  () => {
  return async dispatch => {
      var tipoContenedores =  await GetDataCombobox("tipoContenedores", "name", "id");
      dispatch(GetTipoContenedoresRefOk(tipoContenedores));
  }
};

const GetContenedoresStatusAction =  () => {
  return async dispatch => {
      var contenedoresStatus =  await GetDataCombobox("contenedoresStatus", "name", "id");
      dispatch(GetContenedoresStatusRefOk(contenedoresStatus));
  }
};

const GetPersonalApoyoPerfilesAction =  () => {
  return async dispatch => {
      var personalApoyoPerfiles =  await GetDataCombobox("personalApoyoPerfiles/referencia", "name", "id");
      dispatch(GetPersonalApoyoPerfilesRefOk(personalApoyoPerfiles));
  }
};

const GetPersonalApoyoAction =  () => {
  return async dispatch => {
      var personalApoyo =  await GetDataCombobox("personalApoyo/referencia", "name", "id");
      dispatch(GetPersonalApoyoRefOk(personalApoyo));
  }
};

//Actions
const GetLocalizacionRefOk = items => ({
    type: r.READ_LOCALIZACIONES_OK,
    payload: items
});

const GetBodegasRefOk = items => ({
    type: r.READ_BODEGAS_OK,
    payload: items
});

const GetPosicionesBodegaRefOk = items => ({
    type: r.READ_POSICIONES_BODEGAS_OK,
    payload: items
});

const GetCondicionesRefOk = items => ({
    type: r.READ_CONDICIONES_OK,
    payload: items
});

const GetEnvasesRefOk = items => ({
    type: r.READ_ENVASES_OK,
    payload: items
});

const GetProductosRefOk = items => ({
    type: r.READ_PRODUCTOS_OK,
    payload: items
});

const GetDefectosRefOk = items => ({
    type: r.READ_DEFECTOS_OK,
    payload: items
});

const GetUsuariosRefOk = items => ({
  type: r.READ_USUARIOS_OK,
  payload: items
});

const GetTransportistasRefOk = items => ({
  type: r.READ_TRANSPORTISTAS_OK,
  payload: items
});

const GetLugarRevisionesRefOk = items => ({
  type: r.READ_LUGARREVISIONES_OK,
  payload: items
});

const GetTipoContenedoresRefOk = items => ({
  type: r.READ_TIPOCONTENEDORES_OK,
  payload: items
});

const GetContenedoresStatusRefOk = items => ({
  type: r.READ_CONTENEDORESESTATUSES_OK,
  payload: items
});

const GetPersonalApoyoPerfilesRefOk = items => ({
  type: r.READ_PERSONALAPOYOPERFILES_OK,
  payload: items
});

const GetPersonalApoyoRefOk = items => ({
  type: r.READ_PERSONALAPOYOS_OK,
  payload: items
});

export {
    GetLocalizacionesAction,
    GetBodegasAction,
    GetCondicionesAction,
    GetEnvasesAction,
    GetProductosAction,
    GetPosicionesBodegaAction,
    GetDefectosAction,
    GetUsuariosAction,
    GetContenedoresStatusAction,
    GetLugarRevisionesAction,
    GetTipoContenedoresAction,
    GetTransportistasAction,
    GetPersonalApoyoAction,
    GetPersonalApoyoPerfilesAction,
}
