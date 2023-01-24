import React, { useState, useEffect } from 'react'
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid'
import languageConfig from 'src/config/languageConfig'
import { useSelector } from 'react-redux'
import { CRow, CCol, CButton, CSpinner, CModalHeader, CModalBody, CModal, CListGroup, CListGroupItem, CFormCheck, CModalFooter } from '@coreui/react'
import showMessage from 'src/service/ShowMessage'
import { API_KEY, API_URL_BASE } from 'src/service/constants/index'
import Swal from 'sweetalert2'
import { process } from '@progress/kendo-data-query'
import PropTypes from 'prop-types'
import GridForm from './GridForm'

const EditorGrid = ({ columns, gridConfig }) => {
    const lang = useSelector(state => state.ux.language)
    const [tableData, setTableData] = useState(null)
    const [data, setData] = useState(null)
    const [dataState, setDataState] = useState({
        sort: [],
        take: 10,
        skip: 0
    })
    const [action, setAction] = useState('new')
    const [selectedRow, setSelectedRow] = useState(null)
    const [modal, setModal] = useState(false)
    const [usuariosPerfilesModal, setUsuariosPerfilesModal] = useState(false)
    const [perfilesModal, setPerfilesModal] = useState(false)
    const [usuariosLocalizacionesModal, setUsuariosLocalizacionesModal] = useState(false)

    const [selectedUsuario, setSelectedUsuario] = useState(null)

    const [perfilesValues, setPerfilesValues] = useState(null)
    const [perfilesSelected, setPerfilesSelected] = useState(null)
    const [loadingPerfiles, setLoadingPerfiles] = useState(false)

    const [localizacionesValues, setLocalizacionesValues] = useState(null)
    const [localizacionesSelected, setLocalizacionesSelected] = useState(null)
    const [loadingLocalizaciones, setLoadingLocalizaciones] = useState(false)

    const [selectedPerfil, setSelectedPerfil] = useState(null)
    const [workflowItemValues, setWorkflowItemValues] = useState(null)
    const [workflowItemSelected, setWorkflowItemSelected] = useState(null)
    const [loadingWorkflowItem, setLoadingWorkflowItem] = useState(false)

    const selectionChange = (event) => {
        const xdata = tableData.map(item => {
            if (item[gridConfig.id] === event.dataItem[gridConfig.id])
                item.selected = !event.dataItem.selected
            else
                item.selected = false

            return item
        })
        setTableData(xdata)
    }

    const verPerfiles = () => {
        let usuario = tableData.filter(x => x.selected)
        if (usuario.length > 0) {
            setSelectedUsuario(usuario[0])
            setLoadingPerfiles(true)
            setUsuariosPerfilesModal(true)
            // obtener perfiles con el idUsuario
            fetch(`${API_URL_BASE}${gridConfig.module}/Perfiles/${usuario[0].idUsuario}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "apikey": API_KEY,
                    "language": lang
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log({ response })
                    setPerfilesSelected(response)
                    setLoadingPerfiles(false)
                })
                .catch(function (err) {
                    console.log("Fetch Error :-S", err)
                    setLoadingPerfiles(false)
                })
        }
    }

    const verLocalizaciones = () => {
        let usuario = tableData.filter(x => x.selected)
        if (usuario.length > 0) {
            setSelectedUsuario(usuario[0])
            setLoadingPerfiles(true)
            setUsuariosLocalizacionesModal(true)
            // obtener perfiles con el idUsuario
            fetch(`${API_URL_BASE}${gridConfig.module}/Localizaciones/${usuario[0].idUsuario}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "apikey": API_KEY,
                    "language": lang
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log({ response })
                    setLocalizacionesSelected(response)
                    setLoadingLocalizaciones(false)
                })
                .catch(function (err) {
                    console.log("Fetch Error :-S", err)
                    setLoadingLocalizaciones(false)
                })
        }
    }

    const guardarPerfiles = () => {
        setLoadingPerfiles(true)
        fetch(`${API_URL_BASE}${gridConfig.module}/Perfiles/${selectedUsuario.idUsuario}`, {
            method: "POST",
            body: JSON.stringify(
                perfilesSelected.map((per) => {
                    return {
                        idPerfilUsuario: per.idPerfilUsuario,
                        idUsuario: selectedUsuario.idUsuario,
                    }
                })
            ),
            headers: new Headers({
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "apikey": API_KEY,
                "language": lang
            })
        })
            .then(response => response.json())
            .then(response => {
                setLoadingPerfiles(false)
                setUsuariosPerfilesModal(false)
                showMessage({
                    icon: 'success',
                    title: languageConfig[lang].defaultConfirmEditSuccessTitle
                })
            })
            .catch(function (err) {
                setLoadingPerfiles(false)
                showMessage({
                    icon: 'error',
                    title: "Fetch Error :-S", err
                })
            })
    }

    const guardarLocalizaciones = () => {
        setLoadingLocalizaciones(true)
        fetch(`${API_URL_BASE}${gridConfig.module}/Localizaciones/${selectedUsuario.idUsuario}`, {
            method: "POST",
            body: JSON.stringify(
                localizacionesSelected.map((per) => {
                    return {
                        idLocalizacion: per.idLocalizacion,
                        idUsuario: selectedUsuario.idUsuario,
                    }
                })
            ),
            headers: new Headers({
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "apikey": API_KEY,
                "language": lang
            })
        })
            .then(response => response.json())
            .then(response => {
                setLoadingLocalizaciones(false)
                setUsuariosLocalizacionesModal(false)
                showMessage({
                    icon: 'success',
                    title: languageConfig[lang].defaultConfirmEditSuccessTitle
                })
            })
            .catch(function (err) {
                setLoadingPerfiles(false)
                showMessage({
                    icon: 'error',
                    title: "Fetch Error :-S", err
                })
            })
    }

    const verCategorias = () => {
        let selPerfil = tableData.filter(x => x.selected)
        if (selPerfil.length > 0) {
            setSelectedPerfil(selPerfil[0])
            setLoadingWorkflowItem(true)
            setPerfilesModal(true)
            // obtener workflowItem con el idPerfil
            fetch(`${API_URL_BASE}${gridConfig.module}/WorkflowItem/${selPerfil[0].idPerfilUsuario}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "apikey": API_KEY,
                    "language": lang
                })
            })
                .then(response => response.json())
                .then(response => {
                    setWorkflowItemSelected(response)
                    setLoadingWorkflowItem(false)
                })
                .catch(function (err) {
                    console.log("Fetch Error :-S", err)
                    setLoadingWorkflowItem(false)
                })
        }
    }

    const guardarWorkflowItems = () => {
        setLoadingWorkflowItem(true)
        fetch(`${API_URL_BASE}${gridConfig.module}/WorkflowItem/${selectedPerfil.idPerfilUsuario}`, {
            method: "POST",
            body: JSON.stringify(
                workflowItemSelected.map((wf) => {
                    return {
                        idCategoria: wf.idCategoria,
                        idPerfilUsuario: selectedPerfil.idPerfilUsuario,
                    }
                })
            ),
            headers: new Headers({
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "apikey": API_KEY,
                "language": lang
            })
        })
            .then(response => response.json())
            .then(response => {
                setLoadingWorkflowItem(false)
                setPerfilesModal(false)
                showMessage({
                    icon: 'success',
                    title: languageConfig[lang].defaultConfirmEditSuccessTitle
                })
            })
            .catch(function (err) {
                setLoadingPerfiles(false)
                showMessage({
                    icon: 'error',
                    title: "Fetch Error :-S", err
                })
            })
    }

    const deleteSelected = () => {
        Swal.fire({
            title: languageConfig[gridConfig.lang].defaultConfirmTitle,
            text: languageConfig[gridConfig.lang].defaultConfirmText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#80BC00',
            cancelButtonColor: '#c1c1c1',
            confirmButtonText: languageConfig[gridConfig.lang].defaultConfirmContinue,
            cancelButtonText: languageConfig[gridConfig.lang].defaultConfirmCancel,
        }).then((result) => {
            if (result.value) {
                const sendData = tableData.filter(x => x.selected)[0][gridConfig.id]
                fetch(`${API_URL_BASE}${gridConfig.module}/${sendData}`, {
                    method: "DELETE",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "apikey": API_KEY,
                        "language": lang
                    })
                })
                    .then(response => response.json())
                    .then(response => {
                        handleOnClick()
                        showMessage({
                            icon: 'success',
                            title: languageConfig[lang].defaultConfirmDeleteSuccessTitle
                        })
                    })
                    .catch(function (err) {
                        console.log("Fetch Error :-S", err)
                    })
            }
        })
    }

    const handleOnClick = () => {
        console.log(`-------`)
        fetch(`${API_URL_BASE}${gridConfig.module}`, {
            method: "GET",
            headers: new Headers({
                "apikey": API_KEY,
                "language": lang,
            })
        })
            .then((response) => response.json())
            .then((response) => {
                setData(response)
                setTableData(response.map((r) => {
                    columns
                        .filter(col => col.hasOwnProperty('values'))
                        .map(col => {
                            r[`${col.field}__`] = r[col.field]
                            let newValue = col.values.filter(v => v.value === r[col.field])
                            r[col.field] = newValue.length > 0 ? newValue[0].text : '-'
                            return col
                        })
                    r[`selected`] = false
                    return r
                }))
                setModal(false)
                setSelectedRow(null)
            })
    }

    const CreateEdit = ({ act }) => {
        setAction(act)
        setSelectedRow(act === 'new' ? null : tableData.filter(x => x.selected)[0])
        setModal(true)
    }

    useEffect(() => {
        if (tableData === null && data !== null) {
            setTableData(data.map(dataItem => {
                columns
                    .filter(col => col.hasOwnProperty('values'))
                    .map(col => {
                        dataItem[`${col.field}__`] = dataItem[col.field]
                        let newValue = col.values.filter(v => v.value === dataItem[col.field])
                        dataItem[col.field] = newValue.length > 0 ? newValue[0].text : '-'
                        return col
                    })
                dataItem[`selected`] = false
                return dataItem
            }))
        }
    }, [data, tableData, columns, gridConfig])

    useEffect(() => {
        const read = () => {
            fetch(`${API_URL_BASE}${gridConfig.module}`, {
                method: "GET",
                headers: new Headers({
                    "apikey": API_KEY,
                    "language": lang
                })
            })
                .then((response) => response.json())
                .then((response) => setData(response))
        }

        if (data === null)
            read()

    }, [data, lang, gridConfig])

    useEffect(() => {
        const readPerfiles = () => {
            fetch(`${API_URL_BASE}perfilesUsuario/`, {
                method: "GET",
                headers: new Headers({
                    "apikey": API_KEY,
                    "language": lang
                })
            })
                .then((response) => response.json())
                .then((response) => setPerfilesValues(response))
        }

        const readLocalizaciones = () => {
            fetch(`${API_URL_BASE}localizaciones/`, {
                method: "GET",
                headers: new Headers({
                    "apikey": API_KEY,
                    "language": lang
                })
            })
                .then((response) => response.json())
                .then((response) => setLocalizacionesValues(response))
        }

        const readWorkflows = () => {
            fetch(`${API_URL_BASE}workflowitem/`, {
                method: "GET",
                headers: new Headers({
                    "apikey": API_KEY,
                    "language": lang
                })
            })
                .then((response) => response.json())
                .then((response) => setWorkflowItemValues(response))
        }

        if (perfilesValues === null) readPerfiles()
        if (localizacionesValues === null) readLocalizaciones()
        if (workflowItemValues === null) readWorkflows()

    }, [perfilesValues, localizacionesValues])

    return (
        <>
            {tableData === null ?
                <CSpinner color="primary" /> :
                <CRow>
                    <CCol xs="12">
                        <Grid
                            pageable={true}
                            sortable={true}
                            filterable={true}
                            data={process(tableData, dataState)}
                            {...dataState}
                            onDataStateChange={e => {
                                setDataState(e.dataState)
                            }}
                            style={{ height: '600px' }}
                            reorderable={true}
                            resizable={true}
                            selectable={true}
                            selectedField="selected"
                            onSelectionChange={selectionChange}
                            messages={{
                                "commands": {
                                    "cancel": languageConfig[lang].kendo.grid.commands.cancel,
                                    "canceledit": languageConfig[lang].kendo.grid.commands.canceledit,
                                    "create": languageConfig[lang].kendo.grid.commands.create,
                                    "destroy": languageConfig[lang].kendo.grid.commands.destroy,
                                    "edit": languageConfig[lang].kendo.grid.commands.edit,
                                    "excel": languageConfig[lang].kendo.grid.commands.excel,
                                    "pdf": languageConfig[lang].kendo.grid.commands.pdf,
                                    "save": languageConfig[lang].kendo.grid.commands.save,
                                    "select": languageConfig[lang].kendo.grid.commands.select,
                                    "update": languageConfig[lang].kendo.grid.commands.update,
                                },
                                "editable": {
                                    "cancelDelete": languageConfig[lang].kendo.grid.editable.cancelDelete,
                                    "confirmation": languageConfig[lang].kendo.grid.editable.confirmation,
                                    "confirmDelete": languageConfig[lang].kendo.grid.editable.confirmDelete,
                                },

                                "noRecords": languageConfig[lang].kendo.grid.noRecords,
                            }}
                        >
                            {
                                !gridConfig.isCRUD ? null :
                                    <GridToolbar>
                                        <CButton
                                            onClick={() => CreateEdit({ act: 'new' })}
                                            className="float-right ml-1"
                                            color="success"
                                            style={{ color: `white` }}
                                        >
                                            <i className="fal fa-plus" style={{ marginRight: '5px' }}></i>
                                            {" "}
                                            {languageConfig[lang].kendo.grid.commands.create}
                                        </CButton>
                                        {"  "}
                                        {gridConfig.hasOwnProperty('hideEdit') ? null :
                                            <CButton
                                                onClick={() => CreateEdit({ act: 'edit' })}
                                                className="float-right ml-1"
                                                color="primary"
                                                disabled={tableData.filter(x => x.selected).length <= 0}
                                            >
                                                <i className="fal fa-edit" style={{ marginRight: '5px' }}></i>
                                                {" "}
                                                {languageConfig[lang].kendo.grid.commands.edit}
                                            </CButton>
                                        }
                                        {"  "}
                                        <CButton
                                            onClick={() => deleteSelected()}
                                            className="float-right ml-1"
                                            color="danger"
                                            style={{ color: `white` }}
                                            disabled={tableData.filter(x => x.selected).length <= 0}
                                        >
                                            <i className="fal fa-times" style={{ marginRight: '5px' }}></i>
                                            {" "}
                                            {languageConfig[lang].kendo.grid.commands.destroy}
                                        </CButton>
                                        {" "}
                                        {gridConfig.module == "Usuarios" ? (
                                            <>
                                                <CButton
                                                    onClick={() => verPerfiles()}
                                                    className="float-right ml-1"
                                                    color="primary"
                                                    style={{ color: `white` }}
                                                    disabled={tableData.filter(x => x.selected).length <= 0}
                                                >
                                                    <i className="fal fa-address-card" style={{ marginRight: '5px' }}></i>
                                                    {" "}
                                                    {`Perfiles`}
                                                </CButton>
                                                <CButton
                                                    onClick={() => verLocalizaciones()}
                                                    className="float-right ml-1"
                                                    color="primary"
                                                    style={{ color: `white` }}
                                                    disabled={tableData.filter(x => x.selected).length <= 0}
                                                >
                                                    <i className="fal fa-map" style={{ marginRight: '5px' }}></i>
                                                    {" "}
                                                    {`Localizaciones`}
                                                </CButton>
                                            </>
                                        ) : null}

                                        {gridConfig.module == "PerfilesUsuario" ? (
                                            <>
                                                <CButton
                                                    onClick={() => verCategorias()}
                                                    className="float-right ml-1"
                                                    color="primary"
                                                    style={{ color: `white` }}
                                                    disabled={tableData.filter(x => x.selected).length <= 0}
                                                >
                                                    <i className="fal fa-bars" style={{ marginRight: '5px' }}></i>
                                                    {" "}
                                                    {`Categorias`}
                                                </CButton>
                                            </>
                                        ) : null}
                                    </GridToolbar>
                            }
                            <GridColumn field="selected" width="50px" filterable={false} />
                            {columns.map(col => <GridColumn key={`col_${col.field}`} {...col} />)}
                        </Grid>
                    </CCol>
                </CRow>
            }

            {/* Add or Create modal */}
            <CModal visible={modal} onClose={() => setModal(false)}>
                <CModalHeader>
                    {`${action === 'new' ? `Crear` : `Editar`} ${gridConfig.title}`}
                </CModalHeader>
                <CModalBody>
                    {
                        !modal ? null :
                            <GridForm
                                columns={columns}
                                dataItem={selectedRow}
                                isNew={action === 'new'}
                                gridConfig={gridConfig}
                                handleOnClick={handleOnClick}
                            />
                    }
                </CModalBody>
            </CModal>

            {/* Usuarios - Perfiles */}
            <CModal visible={usuariosPerfilesModal} onClose={() => setUsuariosPerfilesModal(false)}>
                <CModalHeader>
                    {!selectedUsuario ? null : `Perfiles para: ${selectedUsuario.email}`}
                </CModalHeader>
                <CModalBody>
                    {!selectedUsuario || !perfilesValues || !perfilesSelected || loadingPerfiles
                        ? <CSpinner color='primary' />
                        : (
                            <CListGroup>
                                {perfilesValues.map((perfil, iperfil) =>
                                    <CListGroupItem
                                        style={{ cursor: 'pointer' }}
                                        key={iperfil}
                                        onClick={() =>
                                            perfilesSelected.some((per) => per.idPerfilUsuario === perfil.idPerfilUsuario)
                                                ? setPerfilesSelected(perfilesSelected.filter((per) => per.idPerfilUsuario !== perfil.idPerfilUsuario))
                                                : setPerfilesSelected([...perfilesSelected, { ...perfil }])
                                        }

                                    >
                                        <CRow>
                                            <CCol xs={1}>
                                                <CFormCheck
                                                    readOnly
                                                    id={`perfil_${iperfil}`}
                                                    checked={perfilesSelected.some(
                                                        (per) => per.idPerfilUsuario === perfil.idPerfilUsuario
                                                    )}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </CCol>
                                            <CCol xs={11}>
                                                {perfil.nombrePerfilUsuario}
                                            </CCol>
                                        </CRow>
                                    </CListGroupItem>
                                )}
                            </CListGroup>
                        )}
                </CModalBody>
                <CModalFooter>
                    <CButton color='primary' onClick={guardarPerfiles}>Guardar</CButton>
                </CModalFooter>
            </CModal>

            {/* Usuarios - Localizaciones */}
            <CModal visible={usuariosLocalizacionesModal} onClose={() => setUsuariosLocalizacionesModal(false)}>
                <CModalHeader>
                    {!selectedUsuario ? null : `Localizaciones para: ${selectedUsuario.email}`}
                </CModalHeader>
                <CModalBody>
                    {!selectedUsuario || !localizacionesValues || !localizacionesSelected || loadingLocalizaciones
                        ? <CSpinner color='primary' />
                        : (
                            <CListGroup>
                                {localizacionesValues.map((localizacion, ilocalizacion) =>
                                    <CListGroupItem
                                        style={{ cursor: 'pointer' }}
                                        key={ilocalizacion}
                                        onClick={() =>
                                            localizacionesSelected.some((loc) => loc.idLocalizacion === localizacion.idLocalizacion)
                                                ? setLocalizacionesSelected(localizacionesSelected.filter((loc) => loc.idLocalizacion !== localizacion.idLocalizacion))
                                                : setLocalizacionesSelected([...localizacionesSelected, { ...localizacion }])
                                        }
                                    >
                                        <CRow>
                                            <CCol xs={1}>
                                                <CFormCheck
                                                    readOnly
                                                    id={`localizaciones_${ilocalizacion}`}
                                                    checked={localizacionesSelected.some(
                                                        (loc) => loc.idLocalizacion === localizacion.idLocalizacion
                                                    )}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </CCol>
                                            <CCol xs={11}>
                                                {localizacion.localizacion}
                                            </CCol>
                                        </CRow>
                                    </CListGroupItem>
                                )}
                            </CListGroup>
                        )}
                </CModalBody>
                <CModalFooter>
                    <CButton color='primary' onClick={guardarLocalizaciones}>Guardar</CButton>
                </CModalFooter>
            </CModal>

            {/* Perfiles - Categorias */}
            <CModal visible={perfilesModal} onClose={() => setPerfilesModal(false)}>
                <CModalHeader>
                    {!selectedPerfil ? null : `Categorias para: ${selectedPerfil.nombrePerfilUsuario}`}
                </CModalHeader>
                <CModalBody>
                    {!selectedPerfil || !workflowItemValues || !workflowItemSelected || loadingWorkflowItem
                        ? <CSpinner color='primary' />
                        : (
                            <CListGroup>
                                {workflowItemValues.map((wf, iwf) =>
                                    <CListGroupItem
                                        style={{ cursor: 'pointer' }}
                                        key={iwf}
                                        onClick={() =>
                                            workflowItemSelected.some((loc) => loc.idCategoria === wf.idCategoria)
                                                ? setWorkflowItemSelected(workflowItemSelected.filter((loc) => loc.idCategoria !== wf.idCategoria))
                                                : setWorkflowItemSelected([...workflowItemSelected, { ...wf }])
                                        }
                                    >
                                        <CRow>
                                            <CCol xs={1}>
                                                <CFormCheck
                                                    readOnly
                                                    id={`workflowItem_${iwf}`}
                                                    checked={workflowItemSelected.some(
                                                        (loc) => loc.idCategoria === wf.idCategoria
                                                    )}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </CCol>
                                            <CCol xs={11}>
                                                {wf.alias}
                                            </CCol>
                                        </CRow>
                                    </CListGroupItem>
                                )}
                            </CListGroup>
                        )}
                </CModalBody>
                <CModalFooter>
                    <CButton color='primary' onClick={guardarWorkflowItems}>Guardar</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

EditorGrid.propTypes = {
    gridConfig: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.any),
}

export default EditorGrid
