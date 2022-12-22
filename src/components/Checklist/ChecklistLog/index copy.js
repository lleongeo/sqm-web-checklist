import React, { useState } from 'react';
import GvdGrid from '../../shared/Grid';
import { textAreaEditor } from '../../shared/Grid/Helper';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { CRow, CCol, CButton, CAlert } from '@coreui/react';
import { GvdDatePicker } from '../../shared';
import languageConfig from '../../../config/languageConfig';
import { DateRangeValidator } from '../../../service/helper';
import Swal from 'sweetalert2';

const ChecklistLogGrid = () => {

   var [datetimeFrom, setDatetimeFrom] = useState(null);
   var [datetimeTo, setDatetimeTo] = useState(null);

   var [dataSource, setDataSource] = useState({
      url: {
         read: "checklistdetailslog",
      },
      render: false

   });

   const lang = useSelector(state => state.ux.language);
   const user = useSelector(state => state.auth.user);

   var columns = [
      {
         field: "idCheckListDetails",
         title: "Id CheckList Log",
         width: "120px",
      },
      {
         field: "idCheckListMaster",
         title: "Id CheckListDetails",
         width: "120px",
      },
      {
         field: "idTarjeta",
         title: "Id Tarjeta",
         width: "120px"
      },
      {
         field: "idPallet",
         title: "Pallet",
         width: "120px"
      },
      {
         field: "defecto",
         title: "Defecto",
         width: "120px"
      },
      {
         field: "nroTarjeta",
         title: "Nro Tarjeta",
         width: "120px"
      },
      {
         field: "posicion",
         title: "Posición Bodega",
         width: "120px"
      },
      {
         field: "condicion",
         title: "Condición",
         width: "120px"
      },
      {
         field: "observaciones",
         title: "Observaciones",
         width: "120px",
         editor: textAreaEditor
      },
      {
         field: "fechaCreacion",
         title: "Fecha Creación",
         width: "120px",
         template: "#= kendo.toString(kendo.parseDate(fechaCreacion), 'dd-MM-yyyy HH:mm:ss') #"
      },
      {
         field: "usuarioCreacion",
         title: "Usuario Creación",
         width: "120px",

      },
      {
         field: "fechaCambio",
         title: "Fecha Cambio",
         width: "120px",
         template: "#= kendo.toString(kendo.parseDate(fechaCambio), 'dd-MM-yyyy HH:mm:ss') #"

      },
      {
         field: "usuarioCambio",
         title: "Usuario Cambio",
         width: "120px"
      },
      {
         field: "tipoCambio",
         title: "Tipo Cambio",
         width: "120px"
      },
   ]

   const handleOnClick = (e) => {
      var { error } = DateRangeValidator(datetimeFrom, datetimeTo);

      if (error) {
         Swal.fire({
            title: "Error",
            text: languageConfig[gridConfig.lang].filter.message,
            icon: 'error',
            confirmButtonColor: '#f27474',

         });
      } else {
         setDataSource({
            ...dataSource,
            ...dataSource.filter = { desde: moment(datetimeFrom).format(), hasta: moment(datetimeTo).add(23, 'hours').add(59, 'minutes').add(59, 'seconds').format() },
            ...dataSource.render = true
         });
      }
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

   var gridConfig = {
      toolbar: ["excel"],
      command: [],
      lang,
      user
   }

   return (
      <div className="animated fadeIn">
         <CRow>
            <CCol xs="5" md="3" lg="3" xl="2" className="align-self-center">
               <p>{languageConfig[lang].filter.from}</p>
               <br />
               <GvdDatePicker
                  name="datetimeFrom"
                  value={datetimeFrom}
                  onChange={handleOnChange}
                  lang={lang.toLowerCase()}
               />

            </CCol>
            <CCol xs="5" md="3" lg="3" xl="2" className="align-self-center">
               <p>{languageConfig[lang].filter.to}</p>
               <br />
               <GvdDatePicker
                  name="datetimeTo"
                  value={datetimeTo}
                  onChange={handleOnChange}
                  lang={lang.toLowerCase()}
               />
            </CCol>
            <CCol xs="1" className="align-self-end">
               <CButton onClick={handleOnClick} size="sm" type="button" disabled={handleDisableFilterButton()} className="k-button">{languageConfig[lang].filter.buttonText}</CButton>
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
         <CRow>
            <CCol xs="12" >
               <GvdGrid dataSource={dataSource} columns={columns} gridConfig={gridConfig} />
            </CCol>
            <div id="details"></div>
         </CRow>
      </div>
   );
}


export default ChecklistLogGrid;


