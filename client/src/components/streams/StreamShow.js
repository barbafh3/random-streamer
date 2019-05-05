import React, { Component } from 'react';
import { connect } from 'react-redux';

import history from '../../history'; 

import { fetchStream } from '../../actions/streamActions';
import { clearStream } from '../../actions/sessionActions';

class StreamShow extends Component {

    async componentDidMount() {
        if (this.props.session.streamId){
            await this.props.fetchStream(this.props.session.streamId);     
        } else {
            history.push('/');
        }
    }

    componentWillUnmount() {
        this.props.clearStream();
    }

    render() {
        if (!this.props.stream){
            return null
        }
        const { title, description } = this.props.stream;
        return (
            <div>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        stream: state.streams[state.session.provider.streamId],
        session: state.session.provider
    }
}

export default connect(mapStateToProps, { 
    fetchStream, 
    clearStream 
})(StreamShow);
