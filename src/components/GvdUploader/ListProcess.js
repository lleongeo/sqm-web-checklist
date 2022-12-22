import React from 'react'
import { ListGroup } from 'reactstrap'
import ListItemProcess from './ListItemProcess'
import PropTypes from 'prop-types'

const ListProcess = ({ listprocess }) => {
    const { items } = listprocess

    return <ListGroup>
        {items.map((item,ix) => <ListItemProcess key={`lip_${item.title}_${ix}`} {...item} />)}
    </ListGroup>
}

ListProcess.propTypes = {
	listprocess: PropTypes.object,
}

export default ListProcess