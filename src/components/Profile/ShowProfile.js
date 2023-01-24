import React, { useState } from 'react'
import GvdGrid from './CustomGrid'
import { useSelector } from 'react-redux'

const PerfilesUsuarioGrid = () => {
    const lang = useSelector(state => state.ux.language)
    var [columns] = useState([
        { field: "idPerfilUsuario", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
        { field: "nombrePerfilUsuario", title: "Perfil", width: "260px" },
        { field: "descripcionPerfiles", title: "Descripcion", width: "250px" },
    ])

    var gridConfig = {
        isCRUD: true,
        lang,
        module: 'PerfilesUsuario',
        id: 'idPerfilUsuario',
        title: 'PerfilesUsuario'
    }

    return (
        <GvdGrid columns={columns} gridConfig={gridConfig} />
    )
}

export default PerfilesUsuarioGrid
