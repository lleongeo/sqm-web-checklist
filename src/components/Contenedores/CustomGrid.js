import React, { useState, useEffect } from 'react'
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid'
import { GvdDatePicker } from '../shared'
import languageConfig from '../../config/languageConfig'
import { useDispatch, useSelector } from 'react-redux'
import { ExcelExport } from '@progress/kendo-react-excel-export'
import { CRow, CCol, CButton, CAlert, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CCarousel, CCarouselItem, CImage } from '@coreui/react'
import showMessage from '../../service/ShowMessage'
import { API_KEY, API_URL_BASE, STORAGE_URL } from '../../service/constants/index'
import moment from 'moment'
import Swal from 'sweetalert2'
import { DateRangeValidator } from '../../service/helper'
import { process } from '@progress/kendo-data-query'
import { GetContenedoresStatusAction } from '../../redux/actions/references/referencesActions'
import Select from 'react-select'
import _ from 'underscore'
import PropTypes from 'prop-types'

const CustomGrid = ({ columns, gridConfig }) => {
  const lang = useSelector(state => state.ux.language)
  const user = useSelector(state => state.auth.user)
  const [datetimeFrom, setDatetimeFrom] = useState(null)
  const [datetimeTo, setDatetimeTo] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [exportar, setExport] = useState(null)
  const [data, setData] = useState([])
  const [selectedStatus, setSelectedStatus] = useState({ label: "Seleccione estatus", value: 0 })
  const [extraData, setExtraData] = useState(null)
  const [selectedLocked, setSelectedLocked] = useState(false)

  const [wwwCModal, setWwwCModal] = useState(false)
  const [bookingCModal, setBookingCModal] = useState(false)
  const [fotoCModal, setFotoCModal] = useState(false)

  const [loadFilter, setLoadFilter] = useState(languageConfig[lang].filter.buttonText)
  const [dataState, setDataState] = useState({
    sort: [],
    take: 10,
    skip: 0
  })

  const [cambioBooking, setCambioBooking] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState({
    booking: null,
    ordenVenta: null,
    producto: null,
    nave: null
  })

  var dispatch = useDispatch()

  const contenedoresStatus = () => dispatch(GetContenedoresStatusAction())
  const contenedoresStatusValues = useSelector(state => state.references.contenedoresStatus)
  const booking = () => {

  }

  const toggle = () => {
    setWwwCModal(false)
  }

  const toggleBooking = () => {
    setSelectedBooking({
      booking: null,
      ordenVenta: null,
      producto: null,
      nave: null
    })
    setBookingCModal(false)
  }

  const toggleFoto = () => {
    setFotoCModal(false)
  }

  const cambiarBooking = () => {
    const selectedCRow = tableData.filter(x => x.selected)[0]
    const producto = cambioBooking.filter(x => x.booking === selectedBooking.booking.Value && x.ordenVenta === selectedBooking.ordenVenta.Value)[0].producto
    const nave = selectedBooking.nave === "" || selectedBooking.nave === null ? tableData.filter(x => x.selected)[0].nave : selectedBooking.nave

    fetch(`${API_URL_BASE}CheckListContenedoresMaster/Booking/${selectedCRow.idCheckListContenedoresMaster}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        "apikey": API_KEY,
        "language": lang
      }),
      body: JSON.stringify({
        booking: selectedBooking.booking.Value,
        ordenVenta: selectedBooking.ordenVenta.Value,
        nave,
        producto
      })
    })
      //.then(response => response.json())
      .then(response => {
        handleOnClick()
        showMessage({
          icon: 'success',
          title: languageConfig[lang].defaultConfirmEditSuccessTitle
        })
        setBookingCModal(false)
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err)
      })
  }

  const cambiarEstatus = () => {
    const selectedCRow = tableData.filter(x => x.selected)[0]

    if (selectedStatus.Value === 0) {
      Swal.fire('Advertencia', 'Debe seleccionar un estatus del listado.', 'warning')
      return
    }

    if (selectedStatus.Value === parseInt(selectedCRow.idContenedoresStatus)) {
      Swal.fire('Advertencia', 'Debe seleccionar un estatus diferente al actual.', 'warning')
      return
    }

    fetch(`${API_URL_BASE}CheckListContenedoresMaster/Estatus/${selectedCRow.idCheckListContenedoresMaster}/${selectedStatus.Value}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        "apikey": API_KEY,
        "language": lang
      })
    })
      //.then(response => response.json())
      .then(response => {
        handleOnClick()
        showMessage({
          icon: 'success',
          title: languageConfig[lang].defaultConfirmEditSuccessTitle
        })
        setWwwCModal(false)
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err)
      })

  }

  const exportAction = () => {
    exportar.save()
  }

  const handleOnChange = e => {
    setDatetimeFrom(e.target.name === "datetimeFrom" ? new Date(e.target.value) : datetimeFrom)
    setDatetimeTo(e.target.name === "datetimeTo" ? new Date(e.target.value) : datetimeTo)
  }

  const handleDisableFilterButton = () => {
    var from = moment(datetimeFrom).isValid()
    var to = moment(datetimeTo).isValid()

    if (from && to)
      return false
    else
      return true
  }

  const loadExtraData = (data) => {
    const { idCheckListContenedoresMaster } = data
    fetch(`${API_URL_BASE}CheckListContenedoresMaster/Imagenes/${idCheckListContenedoresMaster}`, {
      method: "GET",
      headers: new Headers({
        "apikey": API_KEY,
        "language": lang
      })
    })
      .then(response => response.json())
      .then(response => {
        setExtraData(response)
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err)
      })
  }

  const selectionChange = (event) => {
    const xdata = tableData.map(item => {
      if (item.hasOwnProperty("idCheckListContenedoresMaster"))
        if (item.idCheckListContenedoresMaster === event.dataItem.idCheckListContenedoresMaster) {
          item.selected = !event.dataItem.selected
          if (item.selected) {
            loadExtraData(item)
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


      return item
    })
    setTableData(xdata)
  }

  const handleOnClick = () => {
    setLoadFilter(<><i className="fal fa-cog fa-spin" />{` ${languageConfig[lang].filter.buttonText}`}</>)

    var { error } = DateRangeValidator(datetimeFrom, datetimeTo)

    if (error) {
      Swal.fire({
        title: "Error",
        text: languageConfig[gridConfig.lang].filter.message,
        icon: 'error',
        confirmButtonColor: '#f27474',

      })
      setLoadFilter(languageConfig[lang].filter.buttonText)
    } else {
      fetch(`${API_URL_BASE}${gridConfig.module}?desde=${moment(datetimeFrom).format()}&hasta=${moment(datetimeTo).add(23, 'hours').add(59, 'minutes').add(59, 'seconds').format()}`, {
        method: "GET",
        headers: new Headers({
          "apikey": API_KEY,
          "language": lang
        })
      })
        .then(response => response.json())
        .then(response => {
          setData(response)
          setLoadFilter(languageConfig[lang].filter.buttonText)
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err)
        })
    }
  }

  const LockUnlock = () => {
    const sendData = tableData.filter(x => x.selected)[0]

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

        fetch(`${API_URL_BASE}CheckListContenedoresMaster/Locked/${sendData.idCheckListContenedoresMaster}/${sendData.locked ? 0 : 1}`, {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            "userkey": user.uid,
            "language": lang
          })
        })
          //.then(response => response.json())
          .then(response => {
            handleOnClick()
            showMessage({
              icon: 'success',
              title: "Registro actualizado exitosamente."
            })

          })
          .catch(function (err) {
            console.log("Fetch Error :-S", err)
          })

      }
    })
  }

  const CambiarEstatusCModal = () => {
    setWwwCModal(true)
  }

  const CambiarBookingCModal = () => {
    setBookingCModal(true)
  }

  const VerFotosCModal = () => {
    setFotoCModal(true)
  }


  useEffect(() => {
    if (data.length > 0) {
      setTableData(data.map(dataItem => Object.assign({ selected: false }, dataItem)))
      contenedoresStatus()
      booking()
    }

    if (cambioBooking === null)
      fetch(`${API_URL_BASE}CheckListContenedoresMaster/Booking`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "apikey": API_KEY,
          "language": lang
        })
      })
        .then(response => response.json())
        .then(response => {
          setCambioBooking(response)
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err)
        })
  }
    , [data, cambioBooking])

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
          <CButton onClick={handleOnClick} size="sm" type="button" disabled={handleDisableFilterButton()} className="k-button">{loadFilter}</CButton>
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
                reorderable
                resizable
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
                  >
                    <i className="fal fa-file-excel"></i>
                    {"  "}
                    {languageConfig[lang].kendo.grid.commands.excel}
                  </CButton>
                  {"  "}

                  <>
                    <CButton onClick={() => VerFotosCModal()} className="float-right ml-1" color="info"><i className="fal fa-image"></i>Imágenes</CButton>
                    <CButton onClick={() => LockUnlock()} className="float-right ml-1" color="info"><i className="fal fa-lock"></i> Bloquear/Desbloquear</CButton>
                    {selectedLocked ? null : <CButton onClick={() => CambiarEstatusCModal()} className="float-right ml-1" color="info"><i className="fal fa-cog"></i> Estatus</CButton>}
                    {selectedLocked ? null : <CButton onClick={() => CambiarBookingCModal()} className="float-right ml-1" color="info"><i className="fal fa-file-invoice"></i> Orden Venta</CButton>}
                  </>

                </GridToolbar>
                <GridColumn
                  field="selected"
                  width="50px"
                  filterable={false}
                  headerSelectionValue={
                    tableData.findIndex(dataItem => dataItem.selected === false) === -1
                  } />
                {columns.map(col => <GridColumn key={`col_${col.field}`} {...col} />)}

              </Grid>
            </ExcelExport>

            {contenedoresStatusValues.length <= 0 || tableData.filter(x => x.selected).length <= 0 ? null :
              <CModal visible={wwwCModal} onClose={toggle}>
                <CModalHeader onClose={toggle}>Cambiar Estatus</CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol xs="12">
                      <p>Estado actual: {tableData.filter(x => x.selected)[0].contenedoresStatus}</p>
                      <hr />
                      <Select
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        options={contenedoresStatusValues.map(x => {
                          return {
                            label: x.text,
                            Value: x.value
                          }
                        })} />
                    </CCol>
                  </CRow>
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" onClick={() => cambiarEstatus()}>Guardar</CButton>{' '}
                  <CButton color="secondary" onClick={toggle}>Cancelar</CButton>
                </CModalFooter>
              </CModal>}

            {tableData.filter(x => x.selected).length <= 0 ? null :
              <CModal visible={bookingCModal} onClose={toggleBooking}>
                <CModalHeader onClose={toggleBooking}>Cambiar Booking</CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol xs="12">
                      <p>Booking actual: {tableData.filter(x => x.selected)[0].booking}</p>
                      <p>Orden venta actual: {tableData.filter(x => x.selected)[0].ordenVenta}</p>
                      <p>Nave actual: {tableData.filter(x => x.selected)[0].nave}</p>
                      <p>Producto actual: {tableData.filter(x => x.selected)[0].producto}</p>
                      <hr />
                      Booking
                      <Select
                        value={selectedBooking.booking}
                        onChange={(e) => setSelectedBooking({ ...selectedBooking, booking: e })}
                        options={_.uniq(cambioBooking.map(x => {
                          return {
                            label: x.booking,
                            Value: x.booking
                          }
                        }), x => x.label)} />
                      <br />
                      Orden Venta
                      <Select
                        value={selectedBooking.ordenVenta}
                        onChange={(e) => setSelectedBooking({ ...selectedBooking, ordenVenta: e })}
                        options={selectedBooking.booking === null ? [] : _.uniq(cambioBooking.filter(x => x.booking === selectedBooking.booking.Value).map(x => {
                          return {
                            label: x.ordenVenta,
                            Value: x.ordenVenta
                          }
                        }), x => x.label)} />
                      <br />
                      Nave
                      <CFormInput
                        defaultValue={tableData.filter(x => x.selected)[0].nave}
                        onChange={(e) => setSelectedBooking({ ...selectedBooking, nave: e.target.value })}
                      />
                      <br />
                      Producto
                      <CFormInput
                        defaultValue={selectedBooking.booking === null || selectedBooking.ordenVenta === null ? "" : cambioBooking.filter(x => x.booking === selectedBooking.booking.Value && x.ordenVenta === selectedBooking.ordenVenta.Value)[0].producto}
                        onChange={() => { }}
                        disabled
                      />
                    </CCol>
                  </CRow>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="primary"
                    onClick={() => cambiarBooking()}
                    disabled={selectedBooking.booking === null || selectedBooking.ordenVenta === null}
                  >Guardar</CButton>{' '}
                  <CButton color="secondary" onClick={toggleBooking}>Cancelar</CButton>
                </CModalFooter>
              </CModal>}

            {extraData === null || !fotoCModal || tableData.filter(x => x.selected).length <= 0 ? null :
              <CModal size="xl" visible={fotoCModal} onClose={toggleFoto}>
                <CModalHeader onClose={toggleFoto}>Imágenes</CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol xs="12">
                      {extraData.length <= 0 ? <CAlert color="warning">No hay imagenes para el registro seleccionado.</CAlert> :
                        <CCarousel controls indicators>
                          {extraData.map((x, ix) =>
                            <CCarouselItem key={ix}>
                              <CImage className="d-block w-100" src={`${STORAGE_URL}${x.urlimagen}`} alt={`slide ${ix}`} />
                            </CCarouselItem>
                          )}
                        </CCarousel>}
                    </CCol>
                  </CRow>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={toggleFoto}>Cancelar</CButton>
                </CModalFooter>
              </CModal>}

          </CCol>
        </CRow>
      }
    </>

  )

}

CustomGrid.propTypes = {
  gridConfig: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.any),
}

export default CustomGrid
