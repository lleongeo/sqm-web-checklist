import React from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import { useSelector } from 'react-redux';
import languageConfig from '../../config/languageConfig';
import GvdCollapse from '../GvdCollapse';

const Support = () => {

    const selectedLanguage = useSelector(state => state.ux.language);

    return (<CContainer fluid>

        <CRow>
            <CCol xs="12">
                <h3>{languageConfig[selectedLanguage].faqTitle}</h3>
                <p>{languageConfig[selectedLanguage].faqDescription}</p>
                <hr />
                
                {languageConfig[selectedLanguage].faq.map(f => <GvdCollapse key={f.id} {...f} />)}
            </CCol>
        </CRow>
    </CContainer>)
}

export default Support;