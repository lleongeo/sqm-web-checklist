import React from 'react';
import { ListGroupItem, Row, Col, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCheckCircle, faTimesCircle } from "@fortawesome/pro-light-svg-icons";

const ListItemProcess = (props) => {
    const {text, status, step, error} = props;

    return <ListGroupItem color={status === "loading" ? "info" :
        status === "waiting" ? "warning" :
            status === "done" ? "success" :
                status === "error" ? "danger" :
                    null}>
        <Row>
            <Col xs="1">{step}</Col>
            <Col xs="10">{text}</Col>
            <Col xs="1">
                {
                    status === "loading" ? <Spinner type="grow" /> :
                        status === "waiting" ? <FontAwesomeIcon icon={faClock} /> :
                            status === "done" ? <FontAwesomeIcon icon={faCheckCircle} /> :
                                status === "error" ? <FontAwesomeIcon icon={faTimesCircle} /> :
                                    null
                }
            </Col>
        </Row>
        {
        error !== ""? 
        <Row>
            <Col xs="12">
                {error}
            </Col>
        </Row> : null
        }
    </ListGroupItem>;
}

export default ListItemProcess;


{/* <ListGroupItem action color="success">Cras justo odio</ListGroupItem>
    <ListGroupItem action color="info">Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem action color="warning">Morbi leo risus</ListGroupItem>
    <ListGroupItem action color="danger">Porta ac consectetur ac</ListGroupItem> */}