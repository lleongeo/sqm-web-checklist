import React, { useEffect, useState } from 'react'
import GvdGrid from './CustomGrid'
import { useSelector } from 'react-redux'

const checkLocked = (props) => {
    const chk = props.dataItem.activo
    const icon = chk ?
        <i className="fal fa-check"></i> :
        <i className="fal fa-times"></i>
    return (<td>{icon}</td>)
}

const checkNoti = (props) => {
    const chk = props.dataItem.recibeNotificacion
    const icon = chk ?
        <i className="fal fa-check"></i> :
        <i className="fal fa-times"></i>
    return (<td>{icon}</td>)
}

const UsuariosGrid = () => {
    const lang = useSelector(state => state.ux.language)
    var [columns] = useState([
        { field: "idUsuario", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
        { field: "email", title: "Email", width: "260px" },
        { field: "nombre", title: "Nombre", width: "200px" },
        { field: "apellido", title: "Apellido", width: "200px" },
        { field: "recibeNotificacion", title: "RecibeNotificacion", width: "80px", type: 'boolean', cell: checkNoti, filterable: false },
        { field: "activo", title: "Activo", width: "80px", type: 'boolean', cell: checkLocked, filterable: false },
    ])

    var gridConfig = {
        isCRUD: true,
        lang,
        module: 'Usuarios',
        id: 'idUsuario',
        title: 'Usuarios'
    }

    return (
        <GvdGrid columns={columns} gridConfig={gridConfig} />
    )
}

export default UsuariosGrid
