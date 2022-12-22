import React from 'react';
import { textAreaEditor } from '../../shared/Grid/Helper';
import { useSelector } from 'react-redux';
import CustomGrid from '../CustomGrid';

const ChecklistLogGrid = () => {
   const lang = useSelector(state => state.ux.language);
   const user = useSelector(state => state.auth.user);

   var columns = [
      { field: "idCheckListDetails", title: "Id CheckList Log", width: "120px", },
      { field: "idCheckListMaster", title: "Id CheckListDetails", width: "120px", },
      { field: "idTarjeta", title: "Id Tarjeta", width: "120px" },
      { field: "idPallet", title: "Pallet", width: "120px" },
      { field: "defecto", title: "Defecto", width: "120px" },
      { field: "nroTarjeta", title: "Nro Tarjeta", width: "120px" },
      { field: "posicion", title: "Posición Bodega", width: "120px" },
      { field: "condicion", title: "Condición", width: "120px" },
      { field: "observaciones", title: "Observaciones", width: "120px" },
      { field: "fechaCreacion", title: "Fecha Creación", width: "120px" },
      { field: "usuarioCreacion", title: "Usuario Creación", width: "120px", },
      { field: "fechaCambio", title: "Fecha Cambio", width: "120px" },
      { field: "usuarioCambio", title: "Usuario Cambio", width: "120px" },
      { field: "tipoCambio", title: "Tipo Cambio", width: "120px" },
   ]

   var gridConfig = {
      toolbar: ["excel"],
      user,
      lang,
      module: "CheckListDetailsLog"
   }

   return (<CustomGrid columns={columns} gridConfig={gridConfig} />)
}

export default ChecklistLogGrid;
