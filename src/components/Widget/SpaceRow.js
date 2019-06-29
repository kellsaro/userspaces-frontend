import React from 'react';
import PropTypes from 'utils/propTypes';
import { SpaceInShort } from 'components/Widget';
import { Row } from 'reactstrap';

const SpaceRow = ({ cols }) => {

    return (
        <Row>
        {
            cols.map((space, i) => {
                return ( 
                    <SpaceInShort space={space} key={i} />
                );
            })
        }
        </Row>  
    );
}

SpaceRow.propTypes = {
    cols: PropTypes.array
}

export default SpaceRow;
