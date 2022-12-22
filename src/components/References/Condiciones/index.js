import React, { useState } from 'react'
import GvdGrid from '../../shared/Grid'
import { useSelector } from 'react-redux'

const checkLocked = (props) => {
   const chk = props.dataItem.activo
   const icon = chk ?
      <i className="fal fa-check"></i> :
      <i className="fal fa-times"></i>
   return (<td>{icon}</td>)
}

const colorHexField = (props) => {
   const color = props.dataItem.colorHex
   let colorx = ``
   if (color !== null && color !== "")
      colorx = color.toLowerCase().replace("0xff", "#");
   return <td style={{ backgroundColor: colorx }}>{colorx}</td>
}

const CondicionesGrid = () => {
   const lang = useSelector(state => state.ux.language)
   var [columns] = useState([
      { field: "idCondicion", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
      { field: "condicion", title: "Condición", width: "120px", },
      { field: "descripcion", title: "Descripción", width: "200px" },
      { field: "colorHex", title: "Color", width: "120px", cell: colorHexField },
      { field: "activo", title: "Activo", width: "80px", type: 'boolean', cell: checkLocked, filterable: false },
   ])

   /* var columns = [
      { field: "idCondicion", title: "Id", width: "80px", },
      { field: "condicion", title: "Condición", width: "120px", },
      { field: "descripcion", title: "Descripción", width: "120px", editor: textAreaEditor },
      { field: "colorHex", title: "Color", width: "120px", template: function (dataItem) { if (dataItem.colorHex !== null && dataItem.colorHex !== "") { var color = dataItem.colorHex.toLowerCase().replace("0xff", "#"); return "<div style='background-color: " + color + ";'>&nbsp;</div>"; } }, editor: colorPickerEditor },
      { field: "activo", title: "Activo", width: "120px", template: "#if (activo) {# <i class='fal fa-check'></i> #} else {# <i class='fal fa-times'></i> #}#" },
   ] */

   var gridConfig = {
      isCRUD: true,
      lang,
      module: 'condiciones',
      id: 'idCondicion',
      title: 'Condiciones'
   }

   return (
      <div className="animated fadeIn">
         <GvdGrid columns={columns} gridConfig={gridConfig} />
      </div>
   )
}


export default CondicionesGrid;