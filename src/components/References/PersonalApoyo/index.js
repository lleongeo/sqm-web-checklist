import React from 'react';
import GvdGrid from '../../shared/Grid'
import { useSelector } from 'react-redux';

const checkLocked = (props) => {
  const chk = props.dataItem.activo
  const icon = chk ?
    <i className="fal fa-check"></i> :
    <i className="fal fa-times"></i>
  return (<td>{icon}</td>)
}

const PersonalApoyoGrid = () => {

  const lang = useSelector(state => state.ux.language);

  var columns = [
    { field: "idPersonalApoyo", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
    { field: "nombre", title: "Nombre", width: "220px", },
    { field: "apellidos", title: "Apellidos", width: "220px", },
    { field: "activo", title: "Activo", width: "80px", type: 'boolean', cell: checkLocked, filterable: false },
  ]

  var gridConfig = {
    isCRUD: true,
    lang,
    module: 'personalApoyoCrud',
    id: 'idPersonalApoyo',
    title: 'Personal Apoyo'
  }

  return (
    <div className="animated fadeIn">
      <GvdGrid columns={columns} gridConfig={gridConfig} />
    </div>
  )
}


export default PersonalApoyoGrid;
