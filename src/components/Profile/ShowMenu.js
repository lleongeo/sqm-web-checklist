import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Iframe from 'react-iframe'
import {IFRAME_URL} from '../../service/constants/index'
import './styles.css'

const ShowMenu = () => {
    const selectedLanguage = useSelector(state => state.ux.language);
    return <Iframe url={`${IFRAME_URL}?a=Menu&l=${selectedLanguage}`}
        className="frame"
        display="initial"
        position="relative" />

}

export default ShowMenu;