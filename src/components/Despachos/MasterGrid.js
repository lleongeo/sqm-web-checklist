import React from 'react';
import { useSelector } from 'react-redux';
import CustomGrid from './CustomGrid';

const checkLocked = (props) => {
  const locked = props.dataItem.locked;
  const icon = locked ?
    <i className="fal fa-lock"></i> :
    <i className="fal fa-lock-open"></i>;

  return (
    <td>
      {icon}
    </td>
  );
}

const checkLlevaMuestra = (props) => {
  const llevaMuestra = props.dataItem.llevaMuestra;
  const icon = llevaMuestra ?

    "SI" :
    "NO";

  return (
    <td>
      {icon}
    </td>
  );
}

const DespachosMasterGrid = () => {

  const lang = useSelector(state => state.ux.language);
  const user = useSelector(state => state.auth.user);

  var columns = [
    { field: "locked", title: "Locked", width: "80px", cell: checkLocked },
    { field: "idCheckListDespachosMaster", title: "Id", width: "80px" },
    { field: "lotes", title: "Lotes", width: "220px" },
    { field: "localizacion", title: "Localización", width: "120px" },
    { field: "fechaRegistroApp", title: "Fecha Registro App", width: "180px" },
    { field: "usuario", title: "Usuario", width: "300px" },
    { field: "operador", title: "Operador", width: "180px" },
    { field: "movilizador", title: "Movilizador", width: "180px" },
    { field: "producto", title: "Producto", width: "180px" },
    { field: "ordenVenta", title: "Orden Venta", width: "180px" },
    { field: "nave", title: "Nave", width: "180px" },
    { field: "booking", title: "Booking", width: "220px" },
    { field: "llevaMuestra", title: "Lleva Muestra", width: "120px", cell: checkLlevaMuestra },
    { field: "contenedor", title: "Contenedor", width: "120px" },
    { field: "nselloSQM", title: "N Sello SQM", width: "120px" },
    { field: "tipoMaxi", title: "Tipo Maxi", width: "120px" },
    { field: "tipoPallets", title: "Tipo Pallets", width: "120px" },
    { field: "palletCantidades", title: "Pallet Cantidades", width: "120px" },
    { field: "fechaCreacion", title: "Fecha Creación", width: "200px" },
  ]

  var gridConfig = {
    toolbar: ["excel"],
    user,
    lang,
    select: "single",
    module: "DespachosMaster"
  }

  return (<CustomGrid columns={columns} gridConfig={gridConfig} />)
}


export default DespachosMasterGrid;
