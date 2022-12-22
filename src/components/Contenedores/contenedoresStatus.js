import React from 'react'
import GvdGrid from 'src/components/shared/Grid'
import { useSelector } from 'react-redux'

const checkLocked = (props) => {
   const chk = props.dataItem.activo
   const icon = chk ?
      <i className="fal fa-check"></i> :
      <i className="fal fa-times"></i>
   return (<td>{icon}</td>)
}

const ContenedoresStatusGrid = () => {
   const lang = useSelector(state => state.ux.language);

   var columns = [
      { field: "idContenedoresStatus", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
      { field: "contenedoresStatus1", title: "Contenedor Status", width: "260px", },
      { field: "activo", title: "Activo", width: "80px", type: 'boolean', cell: checkLocked, filterable: false },
   ]

   var gridConfig = {
      isCRUD: true,
      lang,
      module: 'contenedoresStatusCrud',
      id: 'idContenedoresStatus',
      title: 'Contenedores Status',
   }

   return (<div className="animated fadeIn">
      <GvdGrid columns={columns} gridConfig={gridConfig} />
   </div>)
}


export default ContenedoresStatusGrid;
