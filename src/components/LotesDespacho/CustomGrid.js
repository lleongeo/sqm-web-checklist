import React, { useState, useEffect } from 'react'
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid'
import { GvdDatePicker } from '../shared'
import languageConfig from 'src/config/languageConfig'
import { useDispatch, useSelector } from 'react-redux'
import { ExcelExport } from '@progress/kendo-react-excel-export'
import showMessage from 'src/service/ShowMessage'
import { API_KEY, API_URL_BASE, STORAGE_URL } from 'src/service/constants/index'
import moment from 'moment'
import Swal from 'sweetalert2'
import { DateRangeValidator } from 'src/service/helper'
import { process } from '@progress/kendo-data-query'
import { GetLocalizacionesAction, GetCondicionesAction, GetDefectosAction } from 'src/redux/actions/references/referencesActions'
import Select from 'react-select'
import _ from 'underscore'
import GvdDropzone from '../GvdDropzone'
import PropTypes from 'prop-types'
import { CFormInput, CFormTextarea, CRow, CCol, CButton, CAlert, CModal, CModalHeader, CModalBody, CModalFooter, CCarousel, CCarouselItem, CImage } from '@coreui/react'

const CustomGrid = ({ columns, gridConfig }) => {
  const lang = useSelector(state => state.ux.language)
  const user = useSelector(state => state.auth.user)
  const [datetimeFrom, setDatetimeFrom] = useState(null)
  const [datetimeTo, setDatetimeTo] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [exportar, setExport] = useState(null)
  const [data, setData] = useState([])

  const [nLote, setNLote] = useState("")
  const [lotes, setLotes] = useState(null)
  const [lotesPallets, setLotesPallets] = useState(null)
  const [opeMov, setOpeMov] = useState(null)
  const [extraData, setExtraData] = useState(null)
  const [pallets, setPallets] = useState(null)
  const [defectosCondicion, setDefectosCondicion] = useState([])
  const [imgUrl, setImgUrl] = useState("")

  const [opemovCModal, setOpemovCModal] = useState(false)
  const [fotoCModal, setFotoCModal] = useState(false)
  const [lotesCModal, setLotesCModal] = useState(false)
  const [defectoCModal, setDefectoCModal] = useState(false)

  const [selectedLote, setSelectedLote] = useState(null)
  const [selectedLocked, setSelectedLocked] = useState(false)
  const [selectedOperador, setSelectedOperador] = useState(null)
  const [selectedMovilizador, setSelectedMovilizador] = useState(null)
  const [selectedLocalizacion, setSelectedLocalizacion] = useState(null)
  const [selectedPallet, setSelectedPallet] = useState(null)
  const [selectedCondicion, setSelectedCondicion] = useState(null)
  const [selectedDefecto, setSelectedDefecto] = useState(null)
  const [selectedId, setSelectedId] = useState(0)
  const [observaciones, setObservaciones] = useState("")
  const [modo, setModo] = useState("")

  const [loading, setLoading] = useState(false)

  const [loadFilter, setLoadFilter] = useState(languageConfig[lang].filter.buttonText)
  const [dataState, setDataState] = useState({
    sort: [],
    take: 10,
    skip: 0
  })

  var dispatch = useDispatch()

  const localizacionesValues = useSelector(state => state.references.localizaciones)
  const condicionesValues = useSelector(state => state.references.condiciones)
  const defectosValues = useSelector(state => state.references.defectos)

  const toggleLotes = () => {
    setLotesCModal(false)
  }

  const toggleOpemov = () => {
    setOpemovCModal(false)
  }

  const toggleFoto = () => {
    setFotoCModal(false)
  }

  const toggleDefecto = () => {
    setDefectoCModal(false)
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

  const fillForEditCModal = ({ data, images = [] }) => {

    if (data === null) {
      //reset
      setModo("New")
      setSelectedLocalizacion(null)
      setSelectedLote(null)
      setSelectedPallet(null)
      setSelectedCondicion(null)
      setSelectedDefecto(null)
      setObservaciones("")
      setImgUrl("")
      setDefectoCModal(true)
    } else {
      setModo("Edit")
      setSelectedId(data.idCheckListLotesDespachoDetails)

      setSelectedLocalizacion({
        label: data.localizacion,
        Value: localizacionesValues.filter(x => x.text === data.localizacion)[0].value
      })
      setSelectedLote({
        label: data.idLote,
        Value: data.idLote
      })
      setSelectedPallet({
        label: data.idPallet,
        Value: data.idPallet
      })
      setSelectedCondicion({
        label: data.condicion,
        Value: condicionesValues.filter(x => x.text === data.condicion)[0].value,
      })

      fetch(`${API_URL_BASE}Defectos/${condicionesValues.filter(x => x.text === data.condicion)[0].value}`, {
        method: "GET",
        headers: new Headers({
          "apikey": API_KEY,
          "language": lang
        })
      })
        .then(response => response.json())
        .then(response => {
          setDefectosCondicion(response)
          setSelectedDefecto({
            label: data.defecto,
            Value: response.filter(x => x.defecto === data.defecto)[0].idDefecto,
          })
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err)
        })

      setObservaciones(data.observaciones)
      setImgUrl(images.length > 0 ? images[0].urlimagen : "")
    }
  }

  const loadExtraData = (data) => {
    const { idCheckListLotesDespachoDetails } = data
    fetch(`${API_URL_BASE}GviewCheckListLotesDespachoDetails/Imagenes/${idCheckListLotesDespachoDetails}`, {
      method: "GET",
      headers: new Headers({
        "apikey": API_KEY,
        "language": lang
      })
    })
      .then(response => response.json())
      .then(response => {
        setExtraData(response)
        fillForEditCModal({ data, images: response })
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err)
      })
  }

  const selectionChange = (event) => {
    const xdata = tableData.map(item => {

      if (gridConfig.module === "GviewCheckListLotesDespachoMaster")
        if (item.idCheckListLotesDespachoMaster === event.dataItem.idCheckListLotesDespachoMaster) {
          item.selected = !event.dataItem.selected
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



      if (gridConfig.module === "GviewCheckListLotesDespachoDetails")
        if (item.idCheckListLotesDespachoDetails === event.dataItem.idCheckListLotesDespachoDetails) {
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

    if (error && nLote === "") {
      Swal.fire({
        title: "Advertencia",
        text: "Debe llenar el rango de fecha o el número de lote",
        icon: 'error',
        confirmCButtonCColor: '#f27474',

      })
      setLoadFilter(languageConfig[lang].filter.buttonText)
    } else {
      fetch(`${API_URL_BASE}${gridConfig.module}?desde=${datetimeFrom !== null ? moment(datetimeFrom).format("yyyy-MM-DD HH:mm:ss") : ""}&hasta=${datetimeTo !== null ? moment(datetimeTo).add(23, 'hours').add(59, 'minutes').add(59, 'seconds').format("yyyy-MM-DD HH:mm:ss") : ""}&nlote=${nLote}`, {
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
      confirmCButtonCColor: '#80BC00',
      cancelButtonColor: '#c1c1c1',
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {

        fetch(`${API_URL_BASE}GviewCheckListLotesDespachoMaster/Locked/${sendData.idCheckListLotesDespachoMaster}/${sendData.locked ? 0 : 1}`, {
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

  const guardarLote = () => {
    const sendData = tableData.filter(x => x.selected)[0]

    Swal.fire({
      title: "Cambiar Lote",
      text: `¿Desea cambiar el lote del registro a ${selectedLote.Value}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmCButtonCColor: '#80BC00',
      cancelButtonColor: '#c1c1c1',
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {

        fetch(`${API_URL_BASE}GviewCheckListLotesDespachoMaster/Lotes/${sendData.idCheckListLotesDespachoMaster}/${selectedLote.Value}`, {
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

  const CambiarLoteMaster = () => {
    setLotesCModal(true)
  }

  const DeleteDetail = () => {
    const sendData = tableData.filter(x => x.selected)[0]

    Swal.fire({
      title: "Eliminar",
      text: `¿Está seguro de eliminar el registro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmCButtonCColor: '#80BC00',
      cancelButtonColor: '#c1c1c1',
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {

        fetch(`${API_URL_BASE}GviewCheckListLotesDespachoDetails/${sendData.idCheckListLotesDespachoDetails}`, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            "userkey": user.uid,
            "language": lang,
            "apikey": API_KEY
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
      }
    })
  }

  const VerFotosCModal = () => {
    setFotoCModal(true)
  }

  const CambiarOperadorMovilizador = () => {
    setOpemovCModal(true)
  }

  const GuardarOpeMov = () => {
    const sendData = tableData.filter(x => x.selected)[0]

    fetch(`${API_URL_BASE}GviewCheckListLotesDespachoMaster/OperadorMovilizador/${sendData.idCheckListLotesDespachoMaster}`, {
      method: "PUT",
      body: JSON.stringify({
        idMovilizador: selectedMovilizador.Value,
        idOperador: selectedOperador.Value
      }),
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
  }

  const GuardarDefecto = () => {

    let allow = true



    if (!selectedPallet || !selectedDefecto || !selectedCondicion || !selectedLote || imgUrl === "" || observaciones === "") {
      allow = false
      Swal.fire("Advertencia", "Todos los campos son requeridos.", "warning")
    }

    if (allow && observaciones.length < 30) {
      allow = false
      Swal.fire("Advertencia", "debe tener al menos 30 caracteres.", "warning")
    }

    if (allow) {

      let method = "POST"
      let body = JSON.stringify({
        idPallet: selectedPallet.Value,
        idDefecto: selectedDefecto.Value,
        idCondicion: selectedCondicion.Value,
        observaciones,
        nroTarjeta: selectedLote.Value,
        checkListLotesDespachoDetailsImagenes: [{ urlImagen: imgUrl }]
      })

      if (modo === "Edit") {
        method = "PUT"
        body = JSON.stringify({
          idCheckListLotesDespachoDetails: selectedId,
          idPallet: selectedPallet.Value,
          idDefecto: selectedDefecto.Value,
          idCondicion: selectedCondicion.Value,
          observaciones,
          nroTarjeta: selectedLote.Value,
          checkListLotesDespachoDetailsImagenes: [{ urlImagen: imgUrl }]
        })

        fetch(`${API_URL_BASE}CheckListLotesDespachoDetails/`, {
          method,
          body,
          headers: new Headers({
            "Content-Type": "application/json",
            "userkey": user.uid,
            "language": lang
          })
        })
          .then(response => {
            handleOnClick()
            toggleDefecto()
            showMessage({
              icon: 'success',
              title: "Registro actualizado exitosamente."
            })
          })

      } else {
        fetch(`${API_URL_BASE}CheckListLotesDespachoDetails/`, {
          method,
          body,
          headers: new Headers({
            "Content-Type": "application/json",
            "userkey": user.uid,
            "language": lang
          })
        })
          //.then(response => response.json())
          .then(response => {
            if ("InnerException" in response.json()) {
              Swal.fire('Error', response.json().Message, 'error')
            } else {
              handleOnClick()
              toggleDefecto()
              showMessage({
                icon: 'success',
                title: "Registro actualizado exitosamente."
              })
            }
          })
      }
    }
  }

  const changeCondicion = (e) => {
    setDefectosCondicion([])
    setSelectedDefecto(null)
    setSelectedCondicion(e)

    fetch(`${API_URL_BASE}Defectos/${e.Value}`, {
      method: "GET",
      headers: new Headers({
        "apikey": API_KEY,
        "language": lang
      })
    })
      .then(response => response.json())
      .then(response => {
        setDefectosCondicion(response)
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err)
      })
  }

  const selectLote = (e) => {
    setSelectedLote(e)
    if (e) {
      fetch(`${API_URL_BASE}CheckListLotesDespachoDetails/Pallet/${e.Value}`, {
        method: "GET",
        headers: new Headers({
          "apikey": API_KEY,
          "language": lang
        })
      })
        .then(response => response.json())
        .then(response => {
          setPallets(response)
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err)
        })
    }

  }

  const handleUpload = (f) => {
    setLoading(true)

    var reader = new FileReader()
    reader.onload = function (e) {
      let body = JSON.stringify({ imagenBase64: e.target.result })
      // Create
      fetch(`${API_URL_BASE}Imagenes`, {
        method: "POST",
        body,
        headers: new Headers({
          "Content-Type": "application/json",
          "apikey": API_KEY,
          "language": lang
        })
      })
        .then(response => response.json())
        .then(response => {
          setImgUrl(response.result)
          setLoading(false)
        })
        .catch(function (err) {
          showMessage({
            icon: 'error',
            title: "Fetch Error :-S", err
          })
        })

    }
    reader.readAsDataURL(f[0])
    /*  fs.map(f => {
       switch (f.name.split(".")[f.name.split(".").length - 1]) {
         case "jpg":
         case "jpeg":
         case "png":
         case "gif":

           break
         default:
           alert("Only CSV or TXT File are admitted.")
           break
       }
       return f
     }) */
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var localizaciones = () => dispatch(GetLocalizacionesAction())
  var condiciones = () => dispatch(GetCondicionesAction())
  var defectos = () => dispatch(GetDefectosAction())


  useEffect(() => {
    if (data.length > 0) {
      setTableData(data.map(dataItem => Object.assign({ selected: false }, dataItem)))

    }

    if (lotes === null || lotesPallets === null || opeMov === null) {
      localizaciones()
      condiciones()
      defectos()

      fetch(`${API_URL_BASE}CheckListMasters/Lotes/0`, {
        method: "GET",
        headers: new Headers({
          "apikey": API_KEY,
          "language": lang
        })
      })
        .then(response => response.json())
        .then(response => {
          setLotes(response)
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err)
        })

      fetch(`${API_URL_BASE}CheckListLotesDespachoDetails`, {
        method: "GET",
        headers: new Headers({
          "apikey": API_KEY,
          "language": lang
        })
      })
        .then(response => response.json())
        .then(response => {
          setLotesPallets(response)
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err)
        })

      fetch(`${API_URL_BASE}OperadorMovilizador`, {
        method: "GET",
        headers: new Headers({
          "apikey": API_KEY,
          "language": lang
        })
      })
        .then(response => response.json())
        .then(response => {
          setOpeMov(response)
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err)
        })
    }

  }
    , [data, lotes, opeMov, lotesPallets])

  return (
    <>
      <CRow>
        <CCol xs="3" md="3" lg="3" xl="2" className="align-self-center">
          <p>{languageConfig[lang].filter.from}</p>
          <br />
          <GvdDatePicker
            name="datetimeFrom"
            value={datetimeFrom}
            onChange={handleOnChange}
            lang={lang.toLowerCase()}
          />

        </CCol>
        <CCol xs="3" md="3" lg="3" xl="2" className="align-self-center">
          <p>{languageConfig[lang].filter.to}</p>
          <br />
          <GvdDatePicker
            name="datetimeTo"
            value={datetimeTo}
            onChange={handleOnChange}
            lang={lang.toLowerCase()}
          />
        </CCol>
        <CCol xs="2" md="3" lg="3" xl="2">
          <p>Número de lote</p>
          <br />
          <CFormInput
            value={nLote}
            onChange={(e) => setNLote(e.target.value)}
          />
        </CCol>
        <CCol xs="2" className="align-self-end">
          <CButton onClick={handleOnClick} size="sm" type="button" className="k-button">{loadFilter}</CButton>
        </CCol>
        {gridConfig.module !== "GviewCheckListLotesDespachoDetails" ? null :
          <CCol xs="2" className="align-self-end">
            <CButton onClick={() => { fillForEditCModal({ data: null }) }} size="sm" type="button" className="k-button">Agregar Defecto</CButton>
          </CCol>}

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
                pageable
                sortable
                filterable
                data={process(tableData, dataState)}
                {...dataState}
                onDataStateChange={(e) => {
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
                  {gridConfig.module !== "GviewCheckListLotesDespachoMaster" ? null :
                    <>
                      <CButton onClick={() => LockUnlock()} className="float-right ml-1" color="info"><i className="fal fa-lock"></i>{" "}Bloquear/Desbloquear</CButton>
                      {selectedLocked ? null : <CButton onClick={() => CambiarLoteMaster()} className="float-right ml-1" color="info"><i className="fal fa-cog"></i>{" "}Cambiar Lote</CButton>}
                      {selectedLocked ? null : <CButton onClick={() => CambiarOperadorMovilizador()} className="float-right ml-1" color="info"><i className="fal fa-user"></i>{" "}Operador/Movilizador</CButton>}
                    </>}

                  {gridConfig.module !== "GviewCheckListLotesDespachoDetails" ? null :
                    <>
                      {selectedLocked ? null : <CButton onClick={() => DeleteDetail()} className="float-right ml-1" color="info"><i className="fal fa-times"></i>{" "}Eliminar</CButton>}
                      {selectedLocked ? null : <CButton onClick={() => setDefectoCModal(true)} className="float-right ml-1" color="info"><i className="fal fa-edit"></i>{" "}Editar</CButton>}
                      <CButton onClick={() => VerFotosCModal()} className="float-right ml-1" color="info"><i className="fal fa-image"></i>{" "}Imágenes</CButton>
                    </>}

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

            {tableData.filter(x => x.selected).length <= 0 ? null :
              <CModal visible={opemovCModal} onClose={toggleOpemov}>
                <CModalHeader onClose={toggleOpemov}>Cambiar Operador/Movilizador</CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol xs="12">
                      <p>Operador actual: {tableData.filter(x => x.selected)[0].operador}</p>
                      <p>Movilizador actual: {tableData.filter(x => x.selected)[0].movilizador}</p>
                      <hr />
                      Operador
                      <Select
                        value={selectedOperador}
                        onChange={setSelectedOperador}
                        options={opeMov.filter(x => x.perfil === "Operador" && x.localizacion === tableData.filter(x => x.selected)[0].localizacion).map(x => {
                          return {
                            label: x.name,
                            Value: x.id
                          }
                        })} />

                      <br />
                      Movilizador
                      <Select
                        value={selectedMovilizador}
                        onChange={setSelectedMovilizador}
                        options={opeMov.filter(x => x.perfil === "Movilizador" && x.localizacion === tableData.filter(x => x.selected)[0].localizacion).map(x => {
                          return {
                            label: x.name,
                            Value: x.id
                          }
                        })} />
                    </CCol>
                  </CRow>
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" onClick={() => GuardarOpeMov()}>Guardar</CButton>{' '}
                  <CButton color="secondary" onClick={toggleOpemov}>Cancelar</CButton>
                </CModalFooter>
              </CModal>}

            {tableData.filter(x => x.selected).length <= 0 ? null :
              <CModal visible={lotesCModal} onClose={toggleLotes}>
                <CModalHeader onClose={toggleLotes}>Cambiar Lote</CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol xs="12">
                      <p>{`Lote actual: ${tableData.filter(x => x.selected)[0].idLote} (${tableData.filter(x => x.selected)[0].nPallets})`}</p>
                      <hr />
                      <CAlert color="info">Solo se muestran los lotes que tengan la misma cantidad de pallets.</CAlert>
                      <Select
                        value={selectedLote}
                        onChange={setSelectedLote}
                        options={lotes.filter(x => x.qtt === tableData.filter(x => x.selected)[0].nPallets).map(x => {
                          return {
                            label: `${x.idLote} (${x.qtt})`,
                            Value: x.idLote
                          }
                        })} />

                    </CCol>
                  </CRow>
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" onClick={() => guardarLote()}>Guardar</CButton>{' '}
                  <CButton color="secondary" onClick={toggleLotes}>Cancelar</CButton>
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

      {!localizacionesValues || localizacionesValues.length <= 0
        || !condicionesValues || condicionesValues.length <= 0
        || !defectosValues || defectosValues.length <= 0
        ? null :
        <CModal visible={defectoCModal} onClose={toggleDefecto} size="lg">
          <CModalHeader onClose={toggleDefecto}>Agregar defecto</CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="6">
                Localización
                {modo === "Edit" ? <><br />{!selectedLocalizacion ? "" : selectedLocalizacion.label}<br /></> :
                  <Select
                    value={selectedLocalizacion}
                    onChange={setSelectedLocalizacion}
                    options={localizacionesValues.map(x => {
                      return {
                        label: x.text,
                        Value: x.value
                      }
                    })} />
                }
                <br />
                Lote
                {modo === "Edit" ? <><br />{!selectedLote ? "" : selectedLote.label}<br /></> :
                  <Select
                    isClearable
                    value={selectedLote}
                    onChange={(e) => selectLote(e)}
                    disabled={modo === "Edit"}
                    options={selectedLocalizacion === null ? [] : lotesPallets.filter(x => x.idLocalizacion === selectedLocalizacion.Value).map(x => {
                      return {
                        label: x.idLote,
                        Value: x.idLote
                      }
                    })} />
                }
                <br />
                Pallets
                {modo === "Edit" ? <><br />{!selectedPallet ? "" : selectedPallet.label}<br /></> :
                  <Select
                    value={selectedPallet}
                    onChange={setSelectedPallet}
                    disabled={modo === "Edit"}
                    options={pallets === null ? [] : pallets.map(x => {
                      return {
                        label: x.idPallet,
                        Value: x.idPallet
                      }
                    })} />
                }
                <br />
                Condición
                <Select
                  value={selectedCondicion}
                  onChange={changeCondicion}
                  options={condicionesValues.filter(x => x.text !== "A.").map(x => {
                    return {
                      label: x.text,
                      Value: x.value
                    }
                  })} />
                <br />
                Defecto
                <Select
                  value={selectedDefecto}
                  onChange={setSelectedDefecto}
                  options={defectosCondicion.map(x => {
                    return {
                      label: x.defecto,
                      Value: x.idDefecto
                    }
                  })} />
                <br />
                Observaciones
                <CFormTextarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)} />
              </CCol>
              <CCol xs="6">
                Imagen
                <GvdDropzone handleUpload={handleUpload} acceptedFiles={[`.jpg`, `.jpeg`, `.png`, `.gif`]} style={{ height: '100%' }} />
                {loading ? <>Cargando...</> : imgUrl !== "" ? <img style={{ maxWidth: "100%", height: "auto" }} src={`${STORAGE_URL}${imgUrl}`} alt="nuevoDefecto" /> : <CAlert color="info">Debe subir una imagen.</CAlert>}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => GuardarDefecto()}>Guardar</CButton>{' '}
            <CButton color="secondary" onClick={toggleDefecto}>Cancelar</CButton>
          </CModalFooter>
        </CModal>}
    </>
  )
}

CustomGrid.propTypes = {
  gridConfig: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.any),
}

export default CustomGrid
