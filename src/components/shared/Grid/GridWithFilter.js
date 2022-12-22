import React, { useState, useEffect } from 'react'
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid'
import languageConfig from 'src/config/languageConfig'
import { useSelector } from 'react-redux'
import { CRow, CCol, CButton, CModalHeader, CModalBody, CModal, CAlert } from '@coreui/react'
import showMessage from 'src/service/ShowMessage'
import { API_KEY, API_URL_BASE } from 'src/service/constants/index'
import Swal from 'sweetalert2'
import { process } from '@progress/kendo-data-query'
import PropTypes from 'prop-types'
import GridForm from './GridForm'
import moment from 'moment'
import GvdDatePicker from '../DatePicker'
import { DateRangeValidator } from 'src/service/helper'

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
  const [datetimeFrom, setDatetimeFrom] = useState(null)
  const [datetimeTo, setDatetimeTo] = useState(null)
  const [loadFilter, setLoadFilter] = useState(languageConfig[lang].filter.buttonText)

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

  const handleOnChange = e => {
    setDatetimeFrom(e.target.name === "datetimeFrom" ? new Date(e.target.value) : datetimeFrom)
    setDatetimeTo(e.target.name === "datetimeTo" ? new Date(e.target.value) : datetimeTo)
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
    fetch(`${API_URL_BASE}${gridConfig.module}?desde=${moment(datetimeFrom).format()}&hasta=${moment(datetimeTo).add(23, 'hours').add(59, 'minutes').add(59, 'seconds').format()}`, {
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

  const handleDisableFilterButton = () => {
    var from = moment(datetimeFrom).isValid()
    var to = moment(datetimeTo).isValid()

    if (from && to)
      return false
    else
      return true
  }

  const read = () => {
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

  return (
    <>
      <CRow>
        <CCol xs="4" md="3" lg="3" xl="2" className="align-self-center">
          <p>{languageConfig[lang].filter.from}</p>
          <GvdDatePicker
            name="datetimeFrom"
            value={datetimeFrom}
            onChange={handleOnChange}
            lang={lang.toLowerCase()}
          />

        </CCol>
        <CCol xs="4" md="3" lg="3" xl="2" className="align-self-center">
          <p>{languageConfig[lang].filter.to}</p>
          <GvdDatePicker
            name="datetimeTo"
            value={datetimeTo}
            onChange={handleOnChange}
            lang={lang.toLowerCase()}
          />
        </CCol>
        <CCol xs="2" className="align-self-end">
          <CButton onClick={read} size="sm" type="button" disabled={handleDisableFilterButton()} className="k-button">{loadFilter}</CButton>
        </CCol>
        <CCol xs="12">
          <br />
          <CAlert color="secondary">
            {languageConfig[lang].filter.alert}
          </CAlert>
        </CCol>
        <CCol xs="12">
          {!data || !tableData ? null :
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
                  gridConfig.module === 'tocopilla' && tableData.some(x => x.selected && x.estado === 'null') ? null : <GridToolbar>

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
                      {languageConfig[lang].kendo.grid.commands.nullify}
                    </CButton>
                  </GridToolbar>
              }
              <GridColumn field="selected" width="50px" filterable={false} />
              {columns.map(col => <GridColumn key={`col_${col.field}`} {...col} />)}
            </Grid>}
        </CCol>
      </CRow>

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
    </>
  )
}

EditorGrid.propTypes = {
  gridConfig: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.any),
}

export default EditorGrid
