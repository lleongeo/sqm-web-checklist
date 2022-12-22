import React, { useState, useEffect } from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { GvdDatePicker } from '../../components/shared/';
import languageConfig from '../../config/languageConfig';
import { useSelector } from 'react-redux'
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { CRow, CCol, CButton, CAlert } from '@coreui/react';
import showMessage from '../../service/ShowMessage';
import { API_URL_BASE } from '../../service/constants/index';
import moment from 'moment';
import Swal from 'sweetalert2';
import { DateRangeValidator } from '../../service/helper';
import { process } from '@progress/kendo-data-query';
import PropTypes from 'prop-types'

const NavesGrid = ({ columns, gridConfig }) => {
  const lang = useSelector(state => state.ux.language);
  const user = useSelector(state => state.auth.user);
  const [datetimeFrom, setDatetimeFrom] = useState(null);
  const [datetimeTo, setDatetimeTo] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [exportar, setExport] = useState(null);
  const [data, setData] = useState([]);

  const [loadFilter, setLoadFilter] = useState(languageConfig[lang].filter.buttonText);
  const [loadDelete, setLoadDelete] = useState(languageConfig[lang].deleteSelected);
  const [loadValidate, setLoadValidate] = useState(languageConfig[lang].validateSelected);
  const [loadUnvalidate, setLoadUnvalidate] = useState(languageConfig[lang].unvalidateSelected);

  const [loadActualizarDesdeEmbarques, setLoadActualizarDesdeEmbarques] = useState("Actualizar desde embarques");
  const [loadSubscripcionAutomatica, setLoadSubscripcionAutomatica] = useState("Subscripción automática");

  const [dataState, setDataState] = useState({
    sort: [],
    take: 10,
    skip: 0
  })
  const camposFecha = {
    Embarques: ["fechaPreferenteEmbarque",
      "fechaPedido",
      "productoDisponible",
      "eta",
      "etd",
      "avisoDeCierreNitrato",
      "cierreStacking",
      "ets",
      "ultimoDiaStacking",
      "fechaCambio",
      "fechaCreacion"],
    Litio: ["etapol",
      "etspol",
      "fechaDato"],
    Yodo: ["etapol",
      "edtpol",
      "etapod",
      "fechaDato"],
    OceanInsight: ["etd",
      "fechaCambio",
      "fechaEnvio",
      "fechaRespuesta",]
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

  const selectionChange = (event) => {
    const xdata = tableData.map(item => {
      if (item.hasOwnProperty("idEmbarque"))
        if (item.idEmbarque === event.dataItem.idEmbarque)
          item.selected = !event.dataItem.selected;

      if (item.hasOwnProperty("idPdaLitio"))
        if (item.idPdaLitio === event.dataItem.idPdaLitio)
          item.selected = !event.dataItem.selected;

      if (item.hasOwnProperty("idPdaYodo"))
        if (item.idPdaYodo === event.dataItem.idPdaYodo)
          item.selected = !event.dataItem.selected;

      if (item.hasOwnProperty("idOceanInsightsData"))
        if (item.idOceanInsightsData === event.dataItem.idOceanInsightsData)
          item.selected = !event.dataItem.selected;

      return item;
    });
    setTableData(xdata);
  }

  const validateSelected = (val) => {
    if (val === 1)
      setLoadValidate(<><i className="fal fa-cog fa-spin" />{` ${languageConfig[lang].validateSelected}`}</>)
    else if (val === 0)
      setLoadUnvalidate(<><i className="fal fa-cog fa-spin" />{` ${languageConfig[lang].unvalidateSelected}`}</>)

    const sendData = gridConfig.module === "Embarques" ? JSON.stringify({ Id: tableData.filter(x => x.selected).map(x => x.idEmbarque).join(","), Validado: val })
      : gridConfig.module === "Litio" ? JSON.stringify({ Id: tableData.filter(x => x.selected).map(x => x.idPdaLitio).join(","), Validado: val })
        : gridConfig.module === "Yodo" ? JSON.stringify({ Id: tableData.filter(x => x.selected).map(x => x.idPdaYodo).join(","), Validado: val })
          : gridConfig.module === "OceanInsight" ? JSON.stringify({ Id: tableData.filter(x => x.selected).map(x => x.idOceanInsightsData).join(","), Validado: val })
            : "";
    fetch(`${API_URL_BASE}${gridConfig.module}`, {
      method: "PUT",
      body: sendData,
      headers: new Headers({
        "Content-Type": "application/json",
        "userkey": user.uid,
        "language": lang
      })
    })
      .then(response => response.json())
      .then(response => {
        handleOnClick();
        showMessage({
          icon: 'success',
          title: languageConfig[lang].defaultConfirmEditSuccessTitle
        });

        if (val === 1)
          setLoadValidate(languageConfig[lang].validateSelected);
        else if (val === 0)
          setLoadUnvalidate(languageConfig[lang].unvalidateSelected);
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  const ExecuteActionCall = (action) => {
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

        switch (action) {
          case 1:
            setLoadSubscripcionAutomatica(<><i className="fal fa-cog fa-spin" />{` Subscripción automática`}</>);
            break;
          case 2:
            //setLoadActualizarDesdeEmbarques(<><i className="fal fa-cog fa-spin" />{` Actualizar desde embarques`}</>);
            break;
          default:
            break;
        }
        fetch(`${API_URL_BASE}${gridConfig.module}/${action}`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            "userkey": user.uid,
            "language": lang
          })
        })
          .then(response => response.json())
          .then(response => {
            //handleOnClick();
            showMessage({
              icon: 'success',
              title: languageConfig[lang].defaultConfirmEditSuccessTitle
            });

            switch (action) {
              case 1:
                setLoadSubscripcionAutomatica(` Subscripción automática`);
                break;
              case 2:
                setLoadActualizarDesdeEmbarques(` Actualizar desde embarques`);
                break;
              default:
                break;
            }
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

        const sendData = gridConfig.module === "Embarques" ? tableData.filter(x => x.selected).map(x => x.idEmbarque).join(",")
          : gridConfig.module === "OceanInsight" ? tableData.filter(x => x.selected).map(x => x.idOceanInsightsData).join(",")
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
            handleOnClick();
            showMessage({
              icon: 'success',
              title: languageConfig[lang].defaultConfirmDeleteSuccessTitle
            });

            setLoadDelete(languageConfig[lang].deleteSelected);
          })
          .catch(function (err) {
            console.log("Fetch Error :-S", err);
          });

      }
    })

    setLoadDelete(languageConfig[lang].deleteSelected);
  }

  const handleOnClick = () => {
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
          /* setData(response.map(x => {
            camposFecha[gridConfig.module].forEach(campo => {
              x[campo] = moment(x[campo], "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            });
            return x;
          })); */
          setLoadFilter(languageConfig[lang].filter.buttonText);
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    }
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
          <CButton onClick={handleOnClick} size="sm" type="button" disabled={handleDisableFilterButton()} className="k-button">{loadFilter}</CButton>
        </CCol>
        {gridConfig.module !== "OceanInsight" ? null :
          <CCol xs="2" md="4" lg="4" xl="6" className="align-self-end">
            <CButton onClick={() => ExecuteActionCall(1)} className="float-right ml-1" color="success">{loadSubscripcionAutomatica}</CButton>
            {/* <CButton onClick={() => ExecuteActionCall(2)} className="float-right ml-1" color="primary">{loadActualizarDesdeEmbarques}</CButton> */}
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
                    className="k-button"
                    onClick={exportAction}
                  >
                    <i className="fal fa-file-excel"></i>
                    {"  "}
                    {languageConfig[lang].kendo.grid.commands.excel}
                  </CButton>
                  {"  "}
                  {gridConfig.module === "OceanInsight" ?
                    <>
                      <CButton onClick={deleteSelected} className="float-right ml-1" color="danger">{loadDelete}</CButton>
                      {/* <CButton onClick={desuscribirSelected} className="float-right ml-1" color="warning">{loadDesuscribir}</CButton> */}
                    </>
                    :
                    <>
                      <CButton onClick={deleteSelected} className="float-right ml-1" color="danger">{loadDelete}</CButton>
                      {gridConfig.module !== "Embarques" ? null :
                        <>
                          {"  "}
                          <CButton onClick={() => validateSelected(0)} className="float-right ml-1" color="warning">{loadUnvalidate}</CButton>
                          {"  "}
                          <CButton onClick={() => validateSelected(1)} className="float-right ml-1" color="success">{loadValidate}</CButton>
                        </>
                      }
                    </>
                  }

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
          </CCol>
        </CRow>
      }
    </>

  );

}

NavesGrid.propTypes = {
  gridConfig: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.any),
}

export default NavesGrid;
