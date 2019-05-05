import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';
import { deleteStream, fetchStream } from '../../actions/streamActions';
import { clearStream } from '../../actions/sessionActions';

class StreamDelete extends Component {

    componentDidMount(){
        if (this.props.session.streamId) {
            this.props.fetchStream(this.props.session.streamId);
        } else {
            history.push('/');
        }
    }

    componentWillUnmount(){
        this.props.clearStream();
    }

    onDeleteClick = async () => {
        await this.props.deleteStream(this.props.session.streamId);
        history.push('/');
    }

    // React.Fragment replaces <div> when defining multiple tags on JSX
    // as <div> tag breaks semantic-ui css
    renderActions() {
        return (
            <Fragment>
                <button 
                    className='ui button negative' 
                    onClick={this.onDeleteClick}
                >
                    Delete
                </button>
                <Link to='/' className='ui button'>
                    Cancel
                </Link>
            </Fragment>
        );
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?';
        } else {
            return `Are you sure you want to delete the stream with title: ${this.props.stream.title}?`;
        }
    }

    render() {
        return (
            <Modal 
                title='Delete Stream'
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        stream: state.streams[state.session.provider.streamId],
        session: state.session.provider
    }
};

export default connect(mapStateToProps, 
    { deleteStream, fetchStream, clearStream })(StreamDelete);
