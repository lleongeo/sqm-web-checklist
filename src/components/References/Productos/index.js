import React, { useEffect, useState } from 'react'
import GvdGrid from "../../shared/Grid/GridWithExternals"
import { useSelector } from 'react-redux'
import languageConfig from '../../../config/languageConfig'
import $ from "jquery"
import showMessage from '../../../service/ShowMessage'
import { API_URL_BASE, API_KEY } from '../../../service/constants/index'
import { CFormCheck, CSpinner, CRow, CCol, CCard, CCardHeader, CCardBody, CListGroup, CListGroupItem } from '@coreui/react'

const checkLocked = (props) => {
   const chk = props.dataItem.activo
   const icon = chk ?
      <i className="fal fa-check"></i> :
      <i className="fal fa-times"></i>
   return (<td>{icon}</td>)
}

const ProductosGrid = () => {

   const [selectedID, setSelectedID] = useState(null)
   const [envases, setEnvases] = useState([])
   const [selectedEnvases, setSelectedEnvases] = useState([])
   const [selectedNombre, setSelectedNombre] = useState("")
   const [selectedRow, setSelectedRow] = useState(null)
   const selectedLanguage = useSelector(state => state.ux.language)

   var columns = [
      { field: "idProducto", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
      { field: "producto", title: "Producto", width: "220px" },
      { field: "descripcion", title: "Descripción", width: "220px" },
      { field: "activo", title: "Activo", width: "80px", type: 'boolean', cell: checkLocked, filterable: false },
   ]

   const retrieveEnvases = () => {
      fetch(`${API_URL_BASE}envases`, {
         method: "GET",
         headers: new Headers({
            "Content-Type": "application/json",
            "apikey": API_KEY,
            "language": selectedLanguage
         })
      })
         .then(response => response.json())
         .then(response => {
            setEnvases(response)
         })
         .catch(function (err) {
            console.log("Fetch Error :-S", err)
         })
   }

   const getEnvase = (idProducto) => {
      setSelectedID(idProducto)
      fetch(`${API_URL_BASE}productoenvases/${idProducto}`, {
         method: "GET",
         headers: new Headers({
            "Content-Type": "application/json",
            "apikey": API_KEY,
            "language": selectedLanguage
         })
      })
         .then(response => response.json())
         .then(response => {
            setSelectedEnvases(response)
         })
         .catch(function (err) {
            console.log("Fetch Error :-S", err)
         })
   }

   const createULOC = (editObject) => {
      // Create
      fetch(`${API_URL_BASE}productoenvases`, {
         method: "POST",
         body: JSON.stringify(editObject),
         headers: new Headers({
            "Content-Type": "application/json",
            "apikey": API_KEY,
            "language": selectedLanguage
         })
      })
         .then(response => response.json())
         .then(response => {
            getEnvase(editObject.idProducto)
            showMessage({
               icon: 'success',
               title: languageConfig[selectedLanguage].defaultConfirmEditSuccessTitle
            })
         })
         .catch(function (err) {
            showMessage({
               icon: 'error',
               title: "Fetch Error :-S", err
            })
         })
   }

   const deleteULOC = (editObject) => {
      // Delete
      fetch(`${API_URL_BASE}productoenvases?idProducto=${editObject.idProducto}&idEnvase=${editObject.idEnvase}`, {
         method: "DELETE",
         headers: new Headers({
            "Content-Type": "application/json",
            "apikey": API_KEY,
            "language": selectedLanguage
         })
      })
         .then(response => response.json())
         .then(response => {
            getEnvase(editObject.idProducto)

            showMessage({
               icon: 'success',
               title: languageConfig[selectedLanguage].defaultConfirmEditSuccessTitle
            })
         })
         .catch(function (err) {
            showMessage({
               icon: 'error',
               title: "Fetch Error :-S", err
            })
         })
   }

   const toggleLoc = (idEnvase, isChecked) => {
      let editObject = {
         idEnvase,
         idProducto: selectedID
      }
      isChecked ? deleteULOC(editObject) : createULOC(editObject)
   }

   var gridConfig = {
      isCRUD: true,
      lang: selectedLanguage,
      module: 'productos',
      id: 'idProducto',
      title: 'Productos'
   }

   useEffect(() => {
      if (selectedRow !== null) {
         getEnvase(selectedRow.idProducto)
         setSelectedNombre(selectedRow.producto)
      }
   }, [selectedRow])

   useEffect(() => {
      retrieveEnvases()
   }, [])

   return (
      <CRow className="animated fadeIn">
         <CCol xs="8">
            <GvdGrid columns={columns} gridConfig={gridConfig} setExternalSelect={setSelectedRow} />
         </CCol>
         <CCol xs="4">
            <CCard >
               <CCardHeader>
                  <p>{selectedNombre === "" ? languageConfig[selectedLanguage].productsEnvases : selectedNombre}</p>
               </CCardHeader>
               <CCardBody style={{ height: '545px', overflowY: 'scroll', border: 0 }}>
                  <CListGroup flush>
                     {!envases || !selectedEnvases || selectedID === null ? languageConfig[selectedLanguage].unselectedCRow :
                        envases.length <= 0 ? <CSpinner style={{ width: '3rem', height: '3rem' }} type="grow" /> :
                           envases.map(per => {
                              let isChecked = selectedEnvases.filter(p => p.idEnvase === per.idEnvase).length > 0
                              return (
                                 <CListGroupItem key={`lgi_loc_${per.idEnvase}`} tag="a" href="#">
                                    <p>
                                       <CFormCheck
                                          type="checkbox"
                                          id={`check_${per.idEnvase}`}
                                          checked={isChecked}
                                          onChange={() => toggleLoc(per.idEnvase, isChecked)}
                                       />{' '}
                                       {per.envase}
                                    </p>
                                 </CListGroupItem>
                              )
                           })
                     }
                  </CListGroup>
               </CCardBody>
            </CCard>
         </CCol>
      </CRow>
   )
}

export default ProductosGrid

