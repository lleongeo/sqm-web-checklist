import React, { useState } from 'react';
import GvdGrid from '../../shared/Grid';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import CSV from 'csv-string';
import GvdDropzone from '../../GvdDropzone'
import languageConfig from '../../../config/languageConfig';
import showMessage from '../../../service/ShowMessage';
import { API_URL_BASE, API_KEY } from '../../../service/constants/index'
import GvdUploader from '../../GvdUploader/AccordionProcess';


const EmbarquesGrid = () => {

    const lang = useSelector(state => state.ux.language);
    const user = useSelector(state => state.auth.user);

    const [modal, setModal] = useState(false);
    const [listprocess, setListProcess] = useState({
        title: "Importando Embarques",
        items: [
            {
                step: 1,
                text: "Subiendo archivo",
                status: "waiting",
                error: ""
            },
            {
                step: 2,
                text: "Validando columnas",
                status: "waiting",
                error: ""
            },
            {
                step: 3,
                text: "Validando tipo de datos",
                status: "waiting",
                error: ""
            },
            {
                step: 4,
                text: "Almacenando información.",
                status: "waiting",
                error: ""
            },
            {
                step: 5,
                text: "Finalizando importación.",
                status: "waiting",
                error: ""
            },
        ]
    });
    //const [secuencia, setSecuencia] = useState(0);
    const [comparison, setComparison] = useState(null);

    let secuencia = 0;

    const toggle = () => setModal(!modal);

    const nextStep = (prev, next, result) => {
        
        let listprocess2 = { ...listprocess };
        listprocess2.items.map(x => {
            switch (x.step) {
                case prev:
                    x.status = "done";
                    break;
                case next:
                    x.status = "loading";
                    break;
                default:
                    break;
            }
            return x;
        })

        setListProcess(listprocess2);

        switch (next) {
            case 1:
                uploadFile(result);
                break;
            case 2:
                //setSecuencia(result.idImportSequence)
                validateColumns(result);
                break;
            case 3:
                validateDataType(result);
                break;
            case 4:
                importFile(result);
                break;
            case 5:
                finalizeProcess();
                break;
            default:
                break;
        }
    }

    const uploadFile = (fs) => {
        fs.map(f => {
            switch (f.name.split(".")[f.name.split(".").length - 1]) {
                case "csv":
                    loadCSV(f);
                    break;
                case "txt":
                    loadCSV(f);
                    break;
                default:
                    alert("Only CSV or TXT File are admitted.");
                    break;
            }
            return f;
        })
    }

    var dt =
    {
        url: {
            read: "Embarques",
        },
    }

    var columns = [
        { field: "idEmbarque", title: "IdEmbarque" },
        { field: "tipoEmbarque", title: "TipoEmbarque" },
        { field: "oficinaVentas", title: "OficinaVentas" },
        { field: "creadoPor", title: "CreadoPor" },
        { field: "fechaPreferenteEmbarque", title: "FechaPreferenteEmbarque" },
        { field: "cliente", title: "Cliente" },
        { field: "consignatario", title: "Consignatario" },
        { field: "pais", title: "Pais" },
        { field: "puertoDestino", title: "PuertoDestino" },
        { field: "navePreferente", title: "NavePreferente" },
        { field: "navieraPref", title: "NavieraPref" },
        { field: "producto", title: "Producto" },
        { field: "tonelaje", title: "Tonelaje" },
        { field: "capacidadSaco", title: "CapacidadSaco" },
        { field: "codigoSaco", title: "CodigoSaco" },
        { field: "nctd", title: "Nctd" },
        { field: "tonsCont", title: "TonsCont" },
        { field: "tipoCtd", title: "TipoCtd" },
        { field: "cantidadPalletBulto", title: "CantidadPalletBulto" },
        { field: "pallet", title: "Pallet" },
        { field: "observacionEtiqueta", title: "ObservacionEtiqueta" },
        { field: "ordenVenta", title: "OrdenVenta" },
        { field: "entrega", title: "Entrega" },
        { field: "fechaPedido", title: "FechaPedido" },
        { field: "denominacion", title: "Denominacion" },
        { field: "condicionVenta", title: "CondicionVenta" },
        { field: "informacionEmbarque", title: "InformacionEmbarque" },
        { field: "posicion", title: "Posicion" },
        { field: "anno", title: "Anno" },
        { field: "semana", title: "Semana" },
        { field: "motivoRoleo", title: "MotivoRoleo" },
        { field: "comentarios", title: "Comentarios" },
        { field: "ninttra", title: "Ninttra" },
        { field: "bookingBl", title: "BookingBl" },
        { field: "nave", title: "Nave" },
        { field: "naviera", title: "Naviera" },
        { field: "transportista", title: "Transportista" },
        { field: "pol", title: "Pol" },
        { field: "productoDisponible", title: "ProductoDisponible" },
        { field: "eta", title: "Eta" },
        { field: "etd", title: "Etd" },
        { field: "productoEspecifico", title: "ProductoEspecifico" },
        { field: "claseProducto", title: "ClaseProducto" },
        { field: "avisoDeCierreNitrato", title: "AvisoDeCierreNitrato" },
        { field: "status", title: "Status" },
        { field: "cierreStacking", title: "CierreStacking" },
        { field: "swb", title: "Swb" },
        { field: "textoCabecera", title: "TextoCabecera" },
        { field: "comment", title: "Comment" },
        { field: "ets", title: "Ets" },
        { field: "ultimoDiaStacking", title: "UltimoDiaStacking" },
        { field: "gastosDestinoPrepaid", title: "GastosDestinoPrepaid" },
        { field: "claseCliente", title: "ClaseCliente" },
        { field: "clienteFinal", title: "ClienteFinal" },
        { field: "fechaCambio", title: "FechaCambio" },
        { field: "fechaCreacion", title: "FechaCreacion" },
        { field: "usuarioCreacion", title: "UsuarioCreacion" },
        { field: "validado", title: "Validado" },
    ]

    var gridConfig = {
        toolbar: ["excel"],
        command: [],
        lang,
        user
    }

    const finalizeProcess = () => {
        
    }

    const importFile = async (secuencia) => {
        const response = await fetch(`${API_URL_BASE}ImportFile/${secuencia}`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "userkey": user.uid,
                "language": lang
            })
        });
        await response.json()
            .then(response => {
                !response.success ?
                    errorOnStep(4, response.message) : nextStep(4, 5, null);
            })
            .catch(function (err) {
                console.log(err)
                showMessage({
                    icon: 'error',
                    title: "Fetch Error :-S", err
                });
            })
    }

    const validateDataType = async () => {
        const response = await fetch(`${API_URL_BASE}Embarques/${secuencia}`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "userkey": user.uid,
                "language": lang
            })
        });
        await response.json()
            .then(response => {
                !response.success ?
                    errorOnStep(3, response.message) : checkComparison(3, response.result);
            })
            .catch(function (err) {
                console.log(err)
                showMessage({
                    icon: 'error',
                    title: "Fetch Error :-S", err
                });
            })
    }

    const checkComparison = (st, result) => {
        switch (st) {
            case 2:
                if (result.filter(x => x.comparison === "!=").length > 0) {
                    errorOnStep(st, `Se ha encontrado un error en el resultado, por favor ver detalle.`);
                    setComparison(result);
                } else {
                    nextStep(2, 3, result);
                }
                break;
            case 3:
                if (result.length > 0) {
                    errorOnStep(st, `Se ha encontrado un error en el resultado, por favor ver detalle.`);
                    setComparison(result);
                } else {
                    nextStep(3, 4, secuencia);
                }
                break;

            default:
                break;
        }


    }

    const validateColumns = async (sequence) => {
        secuencia = sequence.idImportSequence;
        const response = await fetch(`${API_URL_BASE}Embarques`, {
            method: "PUT",
            body: JSON.stringify(sequence),
            headers: new Headers({
                "Content-Type": "application/json",
                "userkey": user.uid,
                "language": lang
            })
        });

        await response.json()
            .then(response => {
                !response.success ?
                    errorOnStep(2, response.message) : checkComparison(2, response.result);

            })
            .catch(function (err) {
                console.log(err)
                showMessage({
                    icon: 'error',
                    title: "Fetch Error :-S", err
                });
            })
    }

    const errorOnStep = async (st, errorMessage) => {
        let listprocess2 = listprocess;
        listprocess2.items.map(x => {
            if (x.step === st) {
                x.status = "error";
                x.error = errorMessage
            }

        })

        await setListProcess(listprocess2);
    }

    const post = async (editObject) => {
        toggle();
        const response = await fetch(`${API_URL_BASE}Embarques`, {
            method: "POST",
            body: JSON.stringify(editObject),
            headers: new Headers({
                "Content-Type": "application/json",
                "userkey": user.uid,
                "language": lang
            })
        });
        await response.json()
            .then(response => {
                !response.success ?
                    errorOnStep(1, response.message) : nextStep(1, 2, response.result);
            })
            .catch(function (err) {
                console.log(err)
                showMessage({
                    icon: 'error',
                    title: "Fetch Error :-S", err
                });
            })
    }

    const loadCSV = f => {
        var reader = new FileReader()
        reader.onload = (event) => post(CSV.parse(event.target.result, ",", "''"))
        reader.readAsText(f);
    }

    const handleUpload = fs => {
        // Primer paso
        nextStep(0, 1, fs);
    }



    return (
        <div>
            <Row>
                <Col xs="12">
                    <GvdDropzone handleUpload={handleUpload} acceptedFiles={[`.CSV`]} />
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    {/*<GvdGrid dataSource={dt} columns={columns} gridConfig={gridConfig} /> */}
                </Col>
            </Row>
            {!listprocess ? null : <GvdUploader listprocess={listprocess} modal={modal} onClose={toggle} comparison={comparison} />}

        </div>



    )
}


export default EmbarquesGrid;