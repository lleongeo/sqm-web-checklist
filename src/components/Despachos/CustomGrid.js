import React, { useState, useEffect } from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { GvdDatePicker } from '../shared';
import languageConfig from 'src/config/languageConfig';
import { useDispatch, useSelector } from 'react-redux'
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { CRow, CCol, CButton, CAlert, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CCarousel, CCarouselItem, CImage, CCarouselCaption } from '@coreui/react';
import showMessage from 'src/service/ShowMessage';
import { API_KEY, API_URL_BASE, STORAGE_URL } from 'src/service/constants/index';
import moment from 'moment';
import Swal from 'sweetalert2';
import { DateRangeValidator } from 'src/service/helper';
import { process } from '@progress/kendo-data-query';
import _ from 'underscore';
import PropTypes from 'prop-types'

const CustomGrid = ({ columns, gridConfig }) => {
  const lang = useSelector(state => state.ux.language);
  const user = useSelector(state => state.auth.user);
  const [datetimeFrom, setDatetimeFrom] = useState(null);
  const [datetimeTo, setDatetimeTo] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [exportar, setExport] = useState(null);
  const [data, setData] = useState([]);
  const [extraData, setExtraData] = useState(null);
  const [selectedLocked, setSelectedLocked] = useState(false);
  const [fotoCModal, setFotoCModal] = useState(false);
  const [tipoFotoDespacho, setTipoFotoDespacho] = useState(null);
  const [nLote, setNLote] = useState("");


  const [loadFilter, setLoadFilter] = useState(languageConfig[lang].filter.buttonText);
  const [dataState, setDataState] = useState({
    sort: [],
    take: 10,
    skip: 0
  })

  var dispatch = useDispatch();

  const toggleFoto = () => {
    setFotoCModal(false);
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
    const { idCheckListDespachosMaster } = data;
    fetch(`${API_URL_BASE}DespachosMaster/Imagenes/${idCheckListDespachosMaster}`, {
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
      if (gridConfig.module === "DespachosMaster")
        if (item.idCheckListDespachosMaster === event.dataItem.idCheckListDespachosMaster) {
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

      return item;
    });
    setTableData(xdata);
  }

  const handleOnClick = () => {
    setLoadFilter(<><i className="fal fa-cog fa-spin" />{` ${languageConfig[lang].filter.buttonText}`}</>);
    setData([])
    setTableData(null)
    var { error } = DateRangeValidator(datetimeFrom, datetimeTo);

    if (error && nLote === "") {
      Swal.fire({
        title: "Advertencia",
        text: "Debe llenar el rango de fecha o el número de lote",
        icon: 'error',
        confirmButtonColor: '#f27474',

      });
      setLoadFilter(languageConfig[lang].filter.buttonText);
    } else {
      fetch(`${API_URL_BASE}${gridConfig.module}?desde=${datetimeFrom !== null ? moment(datetimeFrom).format() : ""}&hasta=${datetimeTo !== null ? moment(datetimeTo).add(23, 'hours').add(59, 'minutes').add(59, 'seconds').format() : ""}&nlote=${nLote}`, {
        method: "GET",
        headers: new Headers({
          "apikey": API_KEY,
          "language": lang
        })
      })
        .then(response => response.json())
        .then(response => {
          setData(response);
          setLoadFilter(languageConfig[lang].filter.buttonText);
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    }
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

        fetch(`${API_URL_BASE}DespachosMaster/Locked/${sendData.idCheckListDespachosMaster}/${sendData.locked ? 0 : 1}`, {
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

  const VerFotosCModal = () => {
    setFotoCModal(true);
  }

  useEffect(() => {
    if (data.length > 0) {
      setTableData(data.map(dataItem => Object.assign({ selected: false }, dataItem)))
    }

    if (tipoFotoDespacho === null)
      fetch(`${API_URL_BASE}TipoFotoDespacho`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "apikey": API_KEY,
          "language": lang
        })
      })
        .then(response => response.json())
        .then(response => {
          setTipoFotoDespacho(response)
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });

  }
    , [data, tipoFotoDespacho])

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
                  {gridConfig.module === "DespachosMaster" ?
                    <>
                      <CButton onClick={() => VerFotosCModal()} className="float-right ml-1" color="info"><i className="fal fa-image"></i> Imágenes</CButton>
                      <CButton onClick={() => LockUnlock()} className="float-right ml-1" color="info"><i className="fal fa-lock"></i> Bloquear/Desbloquear</CButton>
                    </> : null}

                </GridToolbar>
                {gridConfig.module === "DespachosMaster" ? <GridColumn
                  field="selected"
                  width="50px"
                  filterable={false}
                  headerSelectionValue={
                    tableData.findIndex(dataItem => dataItem.selected === false) === -1
                  } /> : null}
                {columns.map(col => <GridColumn key={`col_${col.field}`} {...col} />)}

              </Grid>
            </ExcelExport>

            {extraData === null || tipoFotoDespacho === null || !fotoCModal || tableData.filter(x => x.selected).length <= 0 ? null :
              <CModal size="xl" visible={fotoCModal} onClose={toggleFoto}>
                <CModalHeader onClose={toggleFoto}>Imágenes</CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol xs="12">
                      {extraData.length <= 0 ? <CAlert color="warning">No hay imagenes para el registro seleccionado.</CAlert> :
                        <CCarousel controls indicators>
                          {extraData.map((x, i) =>
                            <CCarouselItem key={`img_${i}_${x.idCheckListDespachosMaster}`}>
                              <CImage className="d-block w-100" src={`${STORAGE_URL}${x.urlimagen}`} alt="slide 1" />
                              <CCarouselCaption className="d-none d-md-block">
                                {tipoFotoDespacho.filter(t => t.idTipoFotoDespacho === x.idTipoFotoDespacho)[0].tipoFotoDespacho1}
                              </CCarouselCaption>
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

  );

}

CustomGrid.propTypes = {
  gridConfig: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.any),
}

export default CustomGrid;
