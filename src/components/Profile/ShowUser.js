import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Iframe from 'react-iframe'
import { IFRAME_URL } from '../../service/constants/index'
import './styles.css'

const ShowUser = () => {
    const selectedLanguage = useSelector(state => state.ux.language);
    return <Iframe url={`${IFRAME_URL}?a=Users&l=${selectedLanguage}`}
        className="frame"
        display="initial"
        position="relative" />

}

export default ShowUser;