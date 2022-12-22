import React, { useState, useEffect } from 'react'
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid'
import languageConfig from 'src/config/languageConfig'
import { useSelector } from 'react-redux'
import { CRow, CCol, CButton, CSpinner, CModalHeader, CModalBody, CModal } from '@coreui/react'
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
                  </GridToolbar>
              }
              <GridColumn field="selected" width="50px" filterable={false} />
              {columns.map(col => <GridColumn key={`col_${col.field}`} {...col} />)}
            </Grid>
          </CCol>
        </CRow>
      }

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
