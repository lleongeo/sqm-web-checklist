import React from 'react';
import { useSelector } from 'react-redux';
import CustomGrid from './CustomGrid';

const checkLocked = (props) => {
  const chk = props.dataItem.locked;
  const icon = chk ?
    <i className="fal fa-lock"></i> :
    <i className="fal fa-lock-open"></i>;
  return (<td>{icon}</td>);
}

const checkNotificado = (props) => {
  const chk = props.dataItem.notificado;
  const icon = chk ?
    <i className="fal fa-check"></i> :
    <i className="fal fa-times"></i>;
  return (<td>{icon}</td>);
}

const ContenedoresMasterGrid = () => {

  const lang = useSelector(state => state.ux.language);
  const user = useSelector(state => state.auth.user);

  var columns = [
    { field: "idCheckListContenedoresMaster", title: "Id", width: "50px" },
    { field: "localizacion", title: "Localizacion", width: "150px" },
    { field: "contenedoresStatus", title: "ContenedoresStatus", width: "150px" },
    { field: "locked", title: "Locked", width: "120px", cell: checkLocked },
    { field: "fechaRegistroApp", title: "FechaRegistroApp", width: "250px" },
    { field: "creadoPor", title: "CreadoPor", width: "150px" },
    { field: "transportista", title: "Transportista", width: "150px" },
    { field: "lugarRevision", title: "LugarRevision", width: "150px" },
    { field: "contenedor", title: "Contenedor", width: "150px" },
    { field: "nSelloNaviera", title: "NSelloNaviera", width: "150px" },
    { field: "booking", title: "Booking", width: "150px" },
    { field: "producto", title: "Producto", width: "150px" },
    { field: "ordenVenta", title: "OrdenVenta", width: "150px" },
    { field: "nave", title: "Nave", width: "150px" },
    { field: "naviera", title: "Naviera", width: "150px" },
    { field: "nSelloSQM", title: "NSelloSQM", width: "150px" },
    { field: "reparado", title: "Reparado", width: "150px" },
    { field: "ceAbolladuras", title: "Abolladuras", width: "150px" },
    { field: "ceCorrectoCierreApertura", title: "Cierre/Apertura puertas", width: "150px" },
    { field: "ceDeformaciones", title: "Deformaciones", width: "150px" },
    { field: "ceManillasFuncionando", title: "Manillas", width: "150px" },
    { field: "cenSelloConEIR", title: "Sello contenedor", width: "150px" },
    { field: "ciBasuraElementosExtraños", title: "Basura/Elementos Extraños", width: "150px" },
    { field: "ciElementosSobresalenParedes", title: "Elementos sobresalen Paredes", width: "150px" },
    { field: "ciElementosSobresalenPiso", title: "Elementos Sobresalen Piso", width: "150px" },
    { field: "ciGrietasPiso", title: "Grietas Piso", width: "150px" },
    { field: "ciHumedad", title: "Humedad", width: "150px" },
    { field: "ciOrificios", title: "Orificios", width: "150px" },
    { field: "ciOxidoParedes", title: "Paredes con óxido", width: "150px" },
    { field: "ciPisoLevantaHunde", title: "Piso inestable", width: "150px" },
    { field: "ciPresentaInsectos", title: "Presenta Insectos", width: "150px" },
    { field: "ciRestosCargaVegetalAnimal", title: "RestosCargaVegetalAnimal", width: "150px" },
    { field: "ciManchasTransferibles", title: "Manchas Transferibles", width: "150px" },
    { field: "cIOxidoParedesTransferible", title: "Ox Paredes Transferible", width: "150px" },
    { field: "rechazoUnidad", title: "Rechazo Unidad", width: "150px" },
    { field: "tipoContenedor", title: "TipoContenedor", width: "150px" },
    { field: "contenedorFondo", title: "ContenedorFondo", width: "150px" },
    { field: "contenedorAlto", title: "ContenedorAlto", width: "150px" },
    { field: "contenedorAncho", title: "ContenedorAncho", width: "150px" },
    { field: "fechaCreacion", title: "FechaCreacion", width: "250px" },
    { field: "notificado", title: "Notificado", width: "120px", cell: checkNotificado },
    { field: "comentario", title: "Comentario", width: "450px" },
  ]

  var gridConfig = {
    toolbar: ["excel"],
    user,
    lang,
    select: "single",
    module: "CheckListContenedoresMaster"
  }





  return (<CustomGrid columns={columns} gridConfig={gridConfig} />)
}


export default ContenedoresMasterGrid;
