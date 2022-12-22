import React from 'react'
import { ListGroupItem, Row, Col, Spinner } from 'reactstrap'
import PropTypes from 'prop-types'

const ListItemProcess = ({ text, status, error }) => {

    return <ListGroupItem color={status === "loading" ? "info" :
        status === "waiting" ? "warning" :
            status === "done" ? "success" :
                status === "error" ? "danger" :
                    null}>
        <Row>


            <Col xs="1">
                {
                    status === "loading" ? <Spinner type="grow" /> :
                        status === "waiting" ? <i className="fal fa-clock"></i> :
                            status === "done" ? <i className="fal fa-check-circle"></i> :
                                status === "error" ? <i className="fal fa-times-circle"></i> :
                                    null
                }
            </Col>
            <Col xs="11">{text}</Col>
        </Row>
        {
            error !== "" ?
                <Row>
                    <Col xs="12">
                        <hr />
                        {error}
                    </Col>
                </Row> : null
        }
    </ListGroupItem>
}

ListItemProcess.propTypes = {
    text: PropTypes.string,
    status: PropTypes.string,
    error: PropTypes.string,
}

export default ListItemProcess
