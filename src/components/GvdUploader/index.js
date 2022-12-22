import React, { useState } from 'react';
import AccordionProcess from './AccordionProcess';
import languageConfig from "../../config/languageConfig";
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'
import { CListGroup } from '@coreui/react';

const GvdUploader = ({ importList, loading }) => {
  const lang = useSelector(state => state.ux.language);
  const [activeTab, setActiveTab] = useState(importList.length > 0 ? importList[0].id : 0);

  const activateTab = (id) => {
    setActiveTab(id === activeTab ? 0 : id);
  }

  return !importList || importList.length < 0 ? null :
    loading ? "Cargando..." :
      importList.length === 0 ? languageConfig[lang].naves.import.noItems :
        <CListGroup>
          {importList.map(list => <AccordionProcess key={`accor_${list.id}`} list={list} active={activeTab} onClick={activateTab} />)}
        </CListGroup>;
}

GvdUploader.propTypes = {
	loading: PropTypes.bool,
  importList: PropTypes.arrayOf(PropTypes.any),
}

export default GvdUploader;
