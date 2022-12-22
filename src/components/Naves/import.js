//#region Import
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CRow, CCol } from '@coreui/react';
import showMessage from 'src/service/ShowMessage';
import { API_URL_BASE } from 'src/service/constants/index';
import GvdUploader from '../GvdUploader/';
import languageConfig from 'src/config/languageConfig';
import PropTypes from 'prop-types'
//#endregion

const ImportNaves = ({ item }) => {
  //#region Definiciones y store
  const lang = useSelector(state => state.ux.language);
  const user = useSelector(state => state.auth.user);
  const [importList, setImportList] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [importRoute, setImportRoute] = useState("");
  //#endregion

  //#region Métodos
  useEffect(() => {
    retrieve(item);
    fetchImportRoute();
  }, [importRoute, setImportRoute]);

  const retrieve = async (modulo) => {
    const response = await fetch(`${API_URL_BASE}ImportFile?modulo=${modulo}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "userkey": user.uid,
        "language": lang
      })
    });
    await response.json()
      .then(response => {
        setImportList(response);
        setLoadingItems(false);
      })
      .catch(function (err) {
        console.log(err)
        showMessage({
          icon: 'error',
          title: "Fetch Error :-S", err
        });
      })
  }

  const fetchImportRoute = () => {
    fetch(`${API_URL_BASE}Parametros/ImportNavesRoute`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "userkey": user.uid,
        "language": lang
      })
    })
      .then(response => response.json())
      .then(response => {
        setImportRoute(response.valor);
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }
  //#endregion

  //#region Render
  return (
    <div>
      <CRow>
        <CCol xs="12">
          {languageConfig[lang].naves.import.history}
          <hr />
          <GvdUploader importList={importList} loading={loadingItems} />
        </CCol>
      </CRow>
    </div>
  )
  //#endregion
}

ImportNaves.propTypes = {
	item: PropTypes.number,
}

export default ImportNaves;
