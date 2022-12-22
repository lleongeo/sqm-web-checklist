import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavesGrid from '../NavesGrid';
import { CButton, CModal, CModalBody } from '@coreui/react';
import JSONPretty from 'react-json-pretty';

const OceanInsight = () => {
    const [modal, setCModal] = useState(false);
    const toggleCModal = () => setCModal(!modal);

    const popUp = ({ dataItem }) => {
        return (
            <td>
                <CButton id={`popover_${[dataItem.idOceanInsightsData]}`} onClick={toggleCModal} type="button" color="link">
                    Ver
                </CButton>
                <CModal visible={modal} onClose={toggleCModal} size="lg">
                    <CModalBody>
                        <JSONPretty id="json-pretty" data={dataItem.response} />
                    </CModalBody>

                </CModal>
            </td>
        );
    }

    const checkEnviado = ({ dataItem }) => {
        const enviado = dataItem.enviado;
        const icon = enviado ?
            <i className='fal fa-check'></i> :
            <i className='fal fa-times'></i>;

        return (
            <td>
                {icon}
            </td>
        );
    }

    const lang = useSelector(state => state.ux.language);
    const user = useSelector(state => state.auth.user);

    var columns = [
        {
            width: "200px",
            field: "subscription",
            title: "Subscription",
        },
        {
            width: "120px",
            field: "carrier",
            title: "Carrier",
        },
        {
            width: "200px",
            field: "etd",
            title: "ETD",
        },
        {
            width: "200px",
            field: "description",
            title: "Description",
        },
        {
            width: "120px",
            field: "tag1",
            title: "Tag1",
        },
        {
            width: "120px",
            field: "tag2",
            title: "Tag2",
        },
        {
            width: "200px",
            field: "subAccount",
            title: "Sub Account",
        },
        {
            width: "200px",
            field: "fechaCambio",
            title: "Fecha Cambio",
        },
        {
            width: "120px",
            field: "enviado",
            title: "Enviado",
            cell: checkEnviado
        },
        {
            width: "120px",
            field: "statusCode",
            title: "Status Code",
        },
        {
            width: "120px",
            field: "response",
            title: "Response",
            cell: popUp,
            filterable: false
        },
        {
            width: "200px",
            field: "fechaEnvio",
            title: "Fecha Envio"
        },
        {
            width: "200px",
            field: "fechaRespuesta",
            title: "Fecha Respuesta",
        },
    ]

    var gridConfig = {
        toolbar: ["excel"],
        user,
        lang,
        select: "multiple",
        module: "OceanInsight"
    }
    
    return (<NavesGrid columns={columns} gridConfig={gridConfig} />)
}


export default OceanInsight;
