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

const LotesDespachoMasterGrid = () => {

  const lang = useSelector(state => state.ux.language);
  const user = useSelector(state => state.auth.user);

  var columns = [
    { field: "locked", title: "Locked", width: "80px", cell: checkLocked },
    { field: "idCheckListLotesDespachoMaster", title: "Id", width: "80px" },
    { field: "localizacion", title: "Localización", width: "120px" },
    { field: "idTarjeta", title: "IdTarjeta", width: "300px" },
    { field: "idLote", title: "IdLote", width: "120px" },
    { field: "fecha", title: "Fecha", width: "200px" },
    { field: "fechaAccion", title: "Fecha Acción", width: "200px" },
    { field: "fechaCreacion", title: "Fecha Creación", width: "200px" },
    { field: "operador", title: "Operador", width: "170px" },
    { field: "movilizador", title: "Movilizador", width: "170px" },
    { field: "nPallets", title: "NPallets", width: "120px" },
    { field: "email", title: "Email", width: "300px" },
  ]

  var gridConfig = {
    toolbar: ["excel"],
    user,
    lang,
    select: "single",
    module: "GviewCheckListLotesDespachoMaster"
  }





  return (<CustomGrid columns={columns} gridConfig={gridConfig} />)
}


export default LotesDespachoMasterGrid;
