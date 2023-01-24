import React, { useEffect, useState } from 'react'
import GvdGrid from './CustomGrid'
import { useSelector } from 'react-redux'
import { CSpinner } from '@coreui/react'
import { API_KEY, API_URL_BASE } from 'src/service/constants'

const WorkflowItemGrid = () => {
    const lang = useSelector(state => state.ux.language)
    const [categoriasPadre, setCategoriasPadre] = useState(null)
    var [columns, setColumns] = useState(null)

    var gridConfig = {
        isCRUD: true,
        lang,
        module: 'workflowItem',
        id: 'idCategoria',
        idCategoriaPadre: 'alias',
        title: 'Menu'
    }

    useEffect(() => {
        const fetchCategoriaPadre = () => {
            fetch(`${API_URL_BASE}workflowItem`, {
                method: "GET",
                headers: new Headers({
                    "apikey": API_KEY,
                    "language": lang
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log({ response })
                    setCategoriasPadre(response.map((row) => ({ text: row.alias, value: row.idCategoria })))
                })
                .catch(function (err) {
                    console.log("Fetch Error :-S", err)
                })

        }

        if (!categoriasPadre || categoriasPadre.length <= 0) fetchCategoriaPadre()

        if (categoriasPadre && categoriasPadre.length > 0)
            setColumns([
                { field: "idCategoria", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
                { field: "nombreCategoria", title: "Categoria", width: "260px" },
                { field: "alias", title: "Alias", width: "250px" },
                { field: "jerarquia", title: "Jerarquia", width: "100px", type: "number" },
                { field: "idCategoriaPadre", title: "Categoria Padre", width: "250px", type: 'list', values: categoriasPadre },
                { field: "icono", title: "Icono", width: "150px" },
                { field: "ordenCategoriaPadre", title: "Orden", width: "80px", type: "number" },
            ])
    }, [categoriasPadre])

    return (
        categoriasPadre && categoriasPadre.length > 0 && columns !== null ?
            <div className="animated fadeIn">
                <GvdGrid columns={columns} gridConfig={gridConfig} />
            </div>
            : <CSpinner color="primary" />
    )
}

export default WorkflowItemGrid
