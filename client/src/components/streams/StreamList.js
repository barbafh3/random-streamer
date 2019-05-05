import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions/streamActions';
import { provideStream, clearStream } from '../../actions/sessionActions';

class StreamList extends Component {

    componentDidMount(){
        this.props.fetchStreams();
        //        this.props.clearStream();
    }

    renderOwnerActions(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className='right floated content'>
                    <button 
                        className='ui button primary' 
                        onClick={() => this.props.provideStream(stream.id, 'edit')}>
                            Edit
                    </button>
                    <button 
                        className='ui button negative' 
                        onClick={() => this.props.provideStream(stream.id, 'delete')}>
                            Delete
                    </button>
                </div>
            );
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className='item' key={stream.id}>
                    {this.renderOwnerActions(stream)}
                    <i className='large middle aligned icon camera' />
                    <div className='content'>
                        <button 
                            className='ui primary tertiary button'
                            onClick={() => this.props.provideStream(stream.id, 'show')}
                        >
                                {stream.title}
                        </button>
                        <div className='description'>
                            {stream.description}
                        </div>
                    </div>
                </div>  
            );
        });
    }

    renderCreate(){
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to='/streams/new' className='ui button primary'>
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className='ui celled list'>
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    // Object.values() generates an array from an object
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.session.auth.userId,
        isSignedIn: state.session.auth.isSignedIn
    };
}

export default connect(
    mapStateToProps, 
    { 
        fetchStreams,
        provideStream,
        clearStream
    })
(StreamList);
