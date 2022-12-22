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

const LotesDespachoDetailsGrid = () => {

  const lang = useSelector(state => state.ux.language);
  const user = useSelector(state => state.auth.user);

  var columns = [
    { field: "locked", title: "Locked", width: "80px", cell: checkLocked },
    { field: "idCheckListLotesDespachoDetails", title: "Id", width: "80px" },
    { field: "idCheckListLotesDespachoMaster", title: "MasterId", width: "80px" },
    { field: "idLote", title: "IdLote", width: "120px" },
    { field: "localizacion", title: "Localización", width: "120px" },
    { field: "idTarjeta", title: "IdTarjeta", width: "300px" },
    { field: "idPallet", title: "IdPallet", width: "100px" },
    { field: "producto", title: "Producto", width: "180px" },
    { field: "codigo", title: "Código", width: "120px" },
    { field: "envase", title: "Envase", width: "120px" },
    { field: "codigo_Getin", title: "Código Getin", width: "180px" },
    { field: "unidad", title: "Unidad", width: "100px" },
    { field: "total_Unidades", title: "Total Unidades", width: "120px" },
    { field: "serie", title: "Serie", width: "120px" },
    { field: "sscc", title: "SSCC", width: "220px" },
    { field: "correlativo_Venta", title: "Correlativo Venta", width: "140px" },
    { field: "codigoDefecto", title: "Código Defecto", width: "120px" },
    { field: "nroTarjeta", title: "Nro Tarjeta", width: "120px" },
    { field: "condicion", title: "Condición", width: "120px" },
    { field: "fechaCreacion", title: "Fecha Creación", width: "180px" },
    { field: "usuarioCreacion", title: "Usuario Creación", width: "120px" },
    { field: "observaciones", title: "Observaciones", width: "300px" },
    { field: "defecto", title: "Defecto", width: "300px" },
  ]

  var gridConfig = {
    toolbar: ["excel"],
    user,
    lang,
    select: "single",
    module: "GviewCheckListLotesDespachoDetails"
  }





  return (<CustomGrid columns={columns} gridConfig={gridConfig} />)
}


export default LotesDespachoDetailsGrid;
