//#region Importar
import React from 'react';
import { useSelector } from 'react-redux';
import { CRow, CCol, CListGroupItem, CCard, CCardBody, CButton } from '@coreui/react';
import languageConfig from '../../config/languageConfig';
import PropTypes from 'prop-types'
//#endregion

const AccordionProcess = (props) => {
  const { list, active } = props
  //#region Declaraciones y store
  const lang = useSelector(state => state.ux.language);
  //#endregion

  //#region Render
  return <div>
    <CListGroupItem active={list.id === active} action onClick={() => props.onClick(list.id)}>
      <CRow>
        <CCol xs="1">{list.id}</CCol>
        <CCol xs="2">{list.claseProducto !== "Litio" ? "Yodo+Nitrato" : list.claseProducto}</CCol>
        <CCol xs="8">{list.fecha}</CCol>
        <CCol xs="1">{list.ok ?
          <i className="fal fa-check-circle" style={{ color: list.id === active ? "white" : "green" }}></i> :
          <i className="fal fa-comment-exclamation" style={{ color: list.id === active ? "white" : "red" }}></i>}
        </CCol>
      </CRow>
    </CListGroupItem>
    {list.id !== active ? null :
      <CRow>
        <CCol xs="12">
          {list.ok === null || list.id !== active ? null :
            <CCard>
              <CCardBody>
                <CRow>

                  <CCol xs="9">{list.ok ?
                    "La importación se realizó sin inconvenientes." :
                    list.result.indexOf('{') <= -1 ? `Ha ocurrido un error no controlado a nivel general (${list.result}).` :
                      "Hubo un error en la importación, verá el detalle a continuación y lo podrá descargar presionando el boton 'Descargar Log'."}</CCol>
                  <CCol xs="3">
                    {list.ok || !list.result || list.result.indexOf('{') <= -1 ? null :
                      <CButton className="float-right" color="success" size="sm" onClick={console.log(JSON.parse(list.result))}>
                        {/*ESTO DEBE DSCARGAR UN EXCEL CON ESA DATA*/}
                        <i className="fal fa-file-excel"></i>{" "}Descargar Log
                      </CButton>
                    }
                  </CCol>
                </CRow>
                {list.ok || list.result.indexOf('{') <= -1 ? null :
                  <CRow>
                    <CCol xs="12">
                      <table className="table table-hover table-bordered table-striped table-condensed">
                        <thead>
                          <tr>
                            <td>{languageConfig[lang].naves.import.detail.row}</td>
                            <td>Error</td>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            list.result === null || list.result === "" || list.result === "null" ? null :
                              JSON.parse(list.result).map(r => {
                                return (<tr key={`fila_${r.fila}`}>
                                  <td>{r.fila}</td>
                                  <td>{r.mensaje}</td>
                                </tr>)
                              })
                          }
                        </tbody>
                      </table>
                    </CCol>
                  </CRow>}
              </CCardBody>
            </CCard>
          }
        </CCol>
      </CRow>}

  </div>
  //#endregion
}

AccordionProcess.propTypes = {
  active: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.any),
  onClick: PropTypes.func,
}

export default AccordionProcess;

