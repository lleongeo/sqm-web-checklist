import React from 'react'
import { useSelector } from 'react-redux'
import CustomGrid from '../Checklist/CustomGrid'

const checkLocked = (props) => {
   const chk = props.dataItem.locked
   const icon = chk ?
      <i className="fal fa-lock"></i> :
      <i className="fal fa-lock-open"></i>
   return (<td>{icon}</td>)
}

const CheckListMasterGrid = () => {
   const user = useSelector(state => state.auth.user)
   const lang = useSelector(state => state.ux.language)

   var columns = [
      { field: "locked", title: "Locked", width: "100px", cell: checkLocked },
      { field: "idCheckListMaster", title: "Id", width: "100px" },
      { field: "localizacion", title: "Localización", width: "100px" },
      { field: "idTarjeta", title: "IdTarjeta", width: "200px" },
      { field: "idLote", title: "Lote", width: "150px" },
      { field: "envase", title: "Envase", width: "200px" },
      { field: "producto", title: "Producto", width: "200px" },
      { field: "idAutorizador", title: "IdAutorizador", width: "120px" },
      { field: "fechaIngreso", title: "Fecha Ingreso", width: "180px" },
      { field: "fecha", title: "Fecha", width: "180px" },
      { field: "fechaAccion", title: "FechaAccion", width: "180px" },
      { field: "fechaCreacion", title: "FechaCreacion", width: "180px" },
      { field: "email", title: "Email", width: "300px" },
   ]

   var gridConfig = {
      toolbar: ["excel"],
      user,
      lang,
      select: "single",
      module: "CheckListLock"
   }

   return (<CustomGrid columns={columns} gridConfig={gridConfig} />)
}

export default CheckListMasterGrid
