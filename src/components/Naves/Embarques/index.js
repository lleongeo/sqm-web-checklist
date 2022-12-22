import React from 'react';
import { useSelector } from 'react-redux';
import NavesGrid from '../NavesGrid';

const checkValidado = (props) => {
  const validado = props.dataItem.validado;
  const icon = validado ?
    <i className='fal fa-check'></i> :
    <i className='fal fa-times'></i>;

  return (
    <td>
      {icon}
    </td>
  );
}

const Embarques = () => {

  const lang = useSelector(state => state.ux.language);
  const user = useSelector(state => state.auth.user);

  var columns = [
    { width: "120px", field: "validado", title: "Validado", cell: checkValidado, filter: "boolean" },
    { width: "120px", field: "oficinaVentas", title: "OficinaVentas" },
    { width: "250px", field: "cliente", title: "Cliente" },
    { width: "250px", field: "puertoDestino", title: "PuertoDestino" },
    { width: "120px", field: "producto", title: "Producto" },
    { width: "120px", field: "tonelaje", title: "Tonelaje" },
    { width: "120px", field: "nctd", title: "Nctd" },
    { width: "120px", field: "tipoCtd", title: "TipoCtd" },
    { width: "120px", field: "ordenVenta", title: "OrdenVenta" },
    { width: "120px", field: "motivoRoleo", title: "MotivoRoleo" },
    { width: "120px", field: "ninttra", title: "Ninttra" },
    { width: "120px", field: "bookingBl", title: "BookingBl" },
    { width: "250px", field: "nave", title: "Nave" },
    { width: "120px", field: "naviera", title: "Naviera" },
    { width: "120px", field: "transportista", title: "Transportista" },
    { width: "120px", field: "pol", title: "Pol" },
    { width: "120px", field: "eta", title: "Eta" },
    { width: "200px", field: "etd", title: "Etd" },
    { width: "250px", field: "claseProducto", title: "ClaseProducto" },
    { width: "120px", field: "status", title: "Status" },
    { width: "200px", field: "cierreStacking", title: "CierreStacking" },
    { width: "120px", field: "claseCliente", title: "ClaseCliente" },
    { width: "200px", field: "fechaCambio", title: "FechaCambio" },
    { width: "200px", field: "fechaCreacion", title: "FechaCreacion" },
    { width: "120px", field: "usuarioCreacion", title: "UsuarioCreacion" },
  ]

  var gridConfig = {
    toolbar: ["excel"],
    user,
    lang,
    select: "multiple",
    module: "Embarques"
  }
  return (<NavesGrid columns={columns} gridConfig={gridConfig} />)
}


export default Embarques;
