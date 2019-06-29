import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import PropTypes from 'utils/propTypes';

import { Card, CardText, CardTitle} from 'reactstrap';
import Typography from '../Typography';
import { Col } from 'reactstrap';

class SpaceInShort extends Component{
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick = (e) => {
        console.log("Click en show space " + this.props.space.id);
        this.props.history.push(`/spaces/${this.props.space.id}`);
    }

    render = () => {
      return (
            <Col lg={3} md={6} sm={6} xs={12}>
                <div onClick={ this.handleOnClick }>
                    <Card body >
                        <div className="d-flex justify-content-between">
                            <CardText tag="div">
                                <Typography className="mb-0">
                                    <strong>{this.props.space.attributes['name']}</strong>
                                </Typography>
                            </CardText>
                            <CardTitle className={'text-secondary'}>
                                <Typography className="mb-0 text-muted small">Tags</Typography>
                                {this.props.space.attributes['number-of-tags']}
                            </CardTitle>
                        </div>
                    </Card>
                </div>
            </Col>
      );
    }
}

SpaceInShort.propTypes = {
    space: PropTypes.object
}

export default withRouter(SpaceInShort);