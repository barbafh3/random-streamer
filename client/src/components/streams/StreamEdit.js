import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux'

import { fetchStream, editStream } from '../../actions/streamActions';
import { clearStream } from '../../actions/sessionActions';
import StreamForm from './StreamForm';
import history from '../../history';

class StreamEdit extends Component {

    async componentDidMount(){
        if (this.props.session.streamId) {
            await this.props.fetchStream(this.props.session.streamId);
        } else {
            history.push('/');
        }
    }

    onSubmit = formValues => {
        this.props.editStream(this.props.session.streamId, formValues);
        this.props.clearStream();
        history.push('/');
    }

    render() {
        if (!this.props.session.streamId) {
            return null;
        } else {
            return (
                <div>
                    <h3>Edit a Stream</h3>
                    <StreamForm 
                        onSubmit={this.onSubmit} 
                        initialValues={_.pick(this.props.stream, 'title', 'description')} 
                    />
                </div>
            );
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[state.session.streamId],
        session: state.session
    }
};

export default connect(mapStateToProps, {
    fetchStream,
    editStream,
    clearStream
})(StreamEdit);
