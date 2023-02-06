import React, { useState, useEffect } from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { GvdDatePicker } from '../../components/shared/';
import languageConfig from '../../config/languageConfig';
import { useSelector } from 'react-redux'
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { CRow, CCol, CButton, CAlert, CModal, CModalHeader, CModalBody, CModalFooter, CCarousel, CCarouselItem, CImage } from '@coreui/react';
import showMessage from '../../service/ShowMessage';
import { API_KEY, API_URL_BASE, STORAGE_URL } from '../../service/constants/index';
import moment from 'moment';
import Swal from 'sweetalert2';
import { DateRangeValidator } from '../../service/helper';
import { process } from '@progress/kendo-data-query';
import PropTypes from 'prop-types'

const CustomGrid = ({ columns, gridConfig }) => {
    const lang = useSelector(state => state.ux.language);
    const user = useSelector(state => state.auth.user);
    const [datetimeFrom, setDatetimeFrom] = useState(null);
    const [datetimeTo, setDatetimeTo] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [exportar, setExport] = useState(null);
    const [data, setData] = useState([]);
    const [fotoCModal, setFotoCModal] = useState(false);
    const [extraData, setExtraData] = useState(null);

    const [loadFilter, setLoadFilter] = useState(languageConfig[lang].filter.buttonText);
    const [loadDelete, setLoadDelete] = useState(languageConfig[lang].deleteSelected);
    const [loadDesuscribir, setLoadDesuscribir] = useState("Desuscribir seleccionados");
    const [loadValidate, setLoadValidate] = useState(languageConfig[lang].validateSelected);
    const [loadUnvalidate, setLoadUnvalidate] = useState(languageConfig[lang].unvalidateSelected);

    const [loadActualizarDesdeEmbarques, setLoadActualizarDesdeEmbarques] = useState("Actualizar desde embarques");
    const [loadSubscripcionAutomatica, setLoadSubscripcionAutomatica] = useState("Subscripción automática");
    const [loading, setLoading] = useState(false);
    const [selectedLocked, setSelectedLocked] = useState(false);

    const [dataState, setDataState] = useState({
        sort: [],
        take: 10,
        skip: 0
    })

    const camposFecha = {
        CheckListDetails: ["fechaIngreso", "fechaCreacion"],
        CheckListLock: ["fecha", "fechaIngreso", "fechaCreacion", "fechaAccion"],
        CheckListDetailsLog: ["fechaCreacion", "fechaCambio"],
    }

    const exportAction = () => {
        exportar.save();
    }

    const handleOnChange = e => {
        setDatetimeFrom(e.target.name === "datetimeFrom" ? new Date(e.target.value) : datetimeFrom);
        setDatetimeTo(e.target.name === "datetimeTo" ? new Date(e.target.value) : datetimeTo);
    }

    const handleDisableFilterButton = () => {
        var from = moment(datetimeFrom).isValid();
        var to = moment(datetimeTo).isValid();

        if (from && to)
            return false;
        else
            return true;
    }

    const loadExtraData = (data) => {
        const { idCheckListDetails } = data;
        fetch(`${API_URL_BASE}${gridConfig.module}/Imagenes/${idCheckListDetails}`, {
            method: "GET",
            headers: new Headers({
                "apikey": API_KEY,
                "language": lang
            })
        })
            .then(response => response.json())
            .then(response => {
                setExtraData(response);
            })
            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
    }

    const selectionChange = (event) => {
        const xdata = tableData.map(item => {
            if (gridConfig.module === "CheckListLock") {
                if (item.idCheckListMaster === event.dataItem.idCheckListMaster) {
                    item.selected = !event.dataItem.selected;
                    if (item.selected) {
                        if (item.locked) {
                            setSelectedLocked(true)
                        } else {
                            setSelectedLocked(false)
                        }
                    }
                }
                else {
                    if (gridConfig.select === "single") {
                        item.selected = false
                    }
                }
            }

            if (gridConfig.module === "CheckListDetails") {
                if (item.idCheckListDetails === event.dataItem.idCheckListDetails) {
                    item.selected = !event.dataItem.selected;
                    if (item.selected) {
                        loadExtraData(item);
                        if (item.locked) {
                            setSelectedLocked(true)
                        } else {
                            setSelectedLocked(false)
                        }
                    }
                }
                else {
                    if (gridConfig.select === "single") {
                        item.selected = false
                    }
                }
            }

            return item;
        });
        setTableData(xdata);
    }

    const LockUnlock = () => {
        const sendData = tableData.filter(x => x.selected)[0];

        Swal.fire({
            title: "Bloquear/Desbloquear",
            text: `¿Desea cambiar el estatus de bloqueo del registro a ${sendData.locked ? "Desbloqueado" : "Bloqueado"} ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#80BC00',
            cancelButtonColor: '#c1c1c1',
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {

                fetch(`${API_URL_BASE}CheckListLock/Locked/${sendData.idCheckListMaster}/${sendData.locked ? 0 : 1}`, {
                    method: "PUT",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "userkey": user.uid,
                        "language": lang
                    })
                })
                    //.then(response => response.json())
                    .then(response => {
                        handleOnClick();
                        showMessage({
                            icon: 'success',
                            title: "Registro actualizado exitosamente."
                        });

                    })
                    .catch(function (err) {
                        console.log("Fetch Error :-S", err);
                    });

            }
        })
    }

    const deleteSelected = () => {
        setLoadDelete(<><i className="fal fa-cog fa-spin" />{` ${languageConfig[lang].deleteSelected}`}</>);

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

                const sendData = gridConfig.module === "CheckListLock" ? tableData.filter(x => x.selected)[0].idCheckListMaster
                    : gridConfig.module === "CheckListDetails" ? tableData.filter(x => x.selected).map(x => x.idCheckListDetails).join(",")
                        : "";

                fetch(`${API_URL_BASE}${gridConfig.module}/${sendData}`, {
                    method: "DELETE",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "userkey": user.uid,
                        "language": lang
                    })
                })
                    .then(response => response.json())
                    .then(response => {
                        if (response.success) {
                            handleOnClick();
                            showMessage({
                                icon: 'success',
                                title: languageConfig[lang].defaultConfirmDeleteSuccessTitle
                            });

                            setLoadDelete(languageConfig[lang].deleteSelected);
                        } else {
                            showMessage({
                                icon: 'error',
                                title: response.message,

                            });
                        }
                    })
                    .catch(function (err) {
                        console.log("Fetch Error :-S", err);
                    });

            }
        })

        setLoadDelete(languageConfig[lang].deleteSelected);
    }

    const handleOnClick = () => {
        setData([])
        setTableData(null)
        setLoadFilter(<><i className="fal fa-cog fa-spin" />{` ${languageConfig[lang].filter.buttonText}`}</>);

        var { error } = DateRangeValidator(datetimeFrom, datetimeTo);

        if (error) {
            Swal.fire({
                title: "Error",
                text: languageConfig[gridConfig.lang].filter.message,
                icon: 'error',
                confirmButtonColor: '#f27474',

            });
            setLoadFilter(languageConfig[lang].filter.buttonText);
        } else {
            fetch(`${API_URL_BASE}${gridConfig.module}?desde=${moment(datetimeFrom).format()}&hasta=${moment(datetimeTo).add(23, 'hours').add(59, 'minutes').add(59, 'seconds').format()}`, {
                method: "GET",
                headers: new Headers({
                    "userkey": user.uid,
                    "language": lang
                })
            })
                .then(response => response.json())
                .then(response => {
                    setData(response.map(x => {
                        camposFecha[gridConfig.module].forEach(campo => {
                            x[campo] = moment(x[campo], "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
                        });
                        return x;
                    }));
                    setLoadFilter(languageConfig[lang].filter.buttonText);
                })
                .catch(function (err) {
                    console.log("Fetch Error :-S", err);
                });
        }
    }

    const deleteDetail = () => {
        const sendData = tableData.filter(x => x.selected)[0];

        Swal.fire({
            title: "Eliminar",
            text: `¿Está seguro de eliminar el registro?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#80BC00',
            cancelButtonColor: '#c1c1c1',
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {

                fetch(`${API_URL_BASE}${gridConfig.module}/${sendData.idCheckListDetails}`, {
                    method: "DELETE",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "userkey": user.uid,
                        "language": lang,
                        "apikey": API_KEY
                    })
                })
                    .then(response => response.json())
                    .then(response => {
                        if (response.success) {
                            handleOnClick();
                            showMessage({
                                icon: 'success',
                                title: languageConfig[lang].defaultConfirmDeleteSuccessTitle
                            });

                            setLoadDelete(languageConfig[lang].deleteSelected);
                        } else {
                            showMessage({
                                icon: 'error',
                                title: response.message,

                            });
                        }
                    })
            }
        })
    }

    useEffect(() => {
        if (data.length > 0)
            setTableData(data.map(dataItem => Object.assign({ selected: false }, dataItem)))
    }
        , [data])

    return (
        <>
            <CRow>
                <CCol xs="4" md="3" lg="3" xl="2" className="align-self-center">
                    <p>{languageConfig[lang].filter.from}</p>
                    <br />
                    <GvdDatePicker
                        name="datetimeFrom"
                        value={datetimeFrom}
                        onChange={handleOnChange}
                        lang={lang.toLowerCase()}
                    />

                </CCol>
                <CCol xs="4" md="3" lg="3" xl="2" className="align-self-center">
                    <p>{languageConfig[lang].filter.to}</p>
                    <br />
                    <GvdDatePicker
                        name="datetimeTo"
                        value={datetimeTo}
                        onChange={handleOnChange}
                        lang={lang.toLowerCase()}
                    />
                </CCol>
                <CCol xs="2" className="align-self-end">
                    <CButton onClick={handleOnClick} size="sm" disabled={handleDisableFilterButton()} color="primary">{loadFilter}</CButton>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs="12">
                    <br />
                    <CAlert color="secondary">
                        {languageConfig[lang].filter.alert}
                    </CAlert>
                </CCol>
            </CRow>

            {tableData === null ? null :
                <CRow>
                    <CCol xs="12">
                        <ExcelExport
                            data={data}
                            ref={exporter => setExport(exporter)}
                        >
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
                                <GridToolbar>
                                    <CButton
                                        title="Export Excel"
                                        color="success"
                                        onClick={exportAction}
                                        style={{ color: '#fff' }}
                                    >
                                        <i className="fal fa-file-excel" style={{ marginRight: '5px' }}></i>
                                        {"  "}
                                        {languageConfig[lang].kendo.grid.commands.excel}
                                    </CButton>
                                    {"  "}

                                    {gridConfig.module !== "CheckListLock" ? null :
                                        <>
                                            <CButton onClick={deleteSelected} className="float-right ml-1" color="danger" style={{ color: '#fff' }}>
                                                <i className="fal fa-times" style={{ marginRight: '5px' }}></i>
                                                Eliminar
                                            </CButton>
                                            <CButton onClick={LockUnlock} className="float-right ml-1" color="info" style={{ color: '#fff' }}>
                                                <i className="fal fa-lock" style={{ marginRight: '5px' }}></i>
                                                Bloquear/Desbloquear
                                            </CButton>
                                        </>}

                                    {gridConfig.module !== "CheckListDetails" ? null :
                                        <>
                                            {selectedLocked
                                                ? null
                                                : <CButton onClick={() => deleteDetail()} className="float-right ml-1" color="info" style={{ color: '#fff' }}>
                                                    <i className="fal fa-times" style={{ marginRight: '5px' }}></i>
                                                    Eliminar
                                                </CButton>
                                            }

                                            {/* {selectedLocked ? null : <CButton onClick={() => { }} className="float-right ml-1" color="info"><i className="fal fa-edit"></i> Editar</CButton>} */}
                                            <CButton onClick={() => setFotoCModal(true)} className="float-right ml-1" color="info" style={{ color: '#fff' }}>
                                                <i className="fal fa-image" style={{ marginRight: '5px' }}></i>
                                                Imágenes
                                            </CButton>
                                        </>}

                                </GridToolbar>
                                {
                                    gridConfig.module === "CheckListDetailsLog" ? null :
                                        <GridColumn
                                            field="selected"
                                            width="50px"
                                            filterable={false}
                                            headerSelectionValue={
                                                tableData.findIndex(dataItem => dataItem.selected === false) === -1
                                            } />
                                }
                                {columns.map(col => <GridColumn key={`col_${col.field}`} {...col} />)}
                            </Grid>
                        </ExcelExport>
                    </CCol>
                </CRow>
            }

            {/* Foto CModal */}
            <CModal size="xl" visible={fotoCModal} onClose={() => setFotoCModal(false)}>
                <CModalHeader onClose={() => setFotoCModal(false)}>Imágenes</CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs="12">
                            {
                                !extraData || extraData.length <= 0 ?
                                    <CAlert color="warning">No hay imagenes para el registro seleccionado.</CAlert>
                                    :
                                    <CCarousel controls indicators>
                                        {extraData.map((x, ix) =>
                                            <CCarouselItem key={ix} style={{ textAlign: 'center' }}>
                                                <CImage
                                                    src={`${STORAGE_URL}${x.urlimagen}`}
                                                    alt={`slide ${ix}`}
                                                    style={{ maxHeight: '100vh', width: 'auto' }}
                                                />
                                            </CCarouselItem>
                                        )}
                                    </CCarousel>
                            }
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setFotoCModal(false)}>Cancelar</CButton>
                </CModalFooter>
            </CModal>
        </>

    );

}

CustomGrid.propTypes = {
    gridConfig: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.any),
}

export default CustomGrid;
