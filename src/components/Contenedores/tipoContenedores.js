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

const TipoContenedoresGrid = () => {
  const lang = useSelector(state => state.ux.language);

  var columns = [
    { field: "idTipoContenedores", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
    { field: "tipoContenedor", title: "Tipo Contenedor", width: "260px", },
    { field: "fondo", title: "Fondo", width: "120px", type: 'number' },
    { field: "alto", title: "Alto", width: "120px", type: 'number' },
    { field: "ancho", title: "Ancho", width: "120px", type: 'number' },
    { field: "activo", title: "Activo", width: "80px", type: 'boolean', cell: checkLocked, filterable: false },
  ]

  var gridConfig = {
    isCRUD: true,
    lang,
    module: 'tipoContenedoresCrud',
    id: 'idTipoContenedores',
    title: 'Transportistas',
  }

  return (<div className="animated fadeIn">
    <GvdGrid columns={columns} gridConfig={gridConfig} />
  </div>)
}


export default TipoContenedoresGrid;
