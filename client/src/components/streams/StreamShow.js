import React, { Component } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

import history from '../../history'; 

import { fetchStream } from '../../actions/streamActions';
import { clearStream } from '../../actions/sessionActions';

class StreamShow extends Component {

    constructor(props){
        super(props);

        this.videoRef = React.createRef();
    }

    async componentDidMount() {
        const { streamId } = this.props.session
        if (streamId){
            await this.props.fetchStream(streamId);
            this.buildPlayer();
        } else {
            history.push('/');
        }

    }

    componentDidUpdate(){
        this.buildPlayer();
    }

    buildPlayer(){
        if (this.player || !this.props.stream){
            return;
        }
        const { streamId } = this.props.session;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${streamId}.flv` 
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    componentWillUnmount() {
        this.props.clearStream();
        if (this.player) { this.player.destroy(); }
    }

    render() {
        if (!this.props.stream){
            return null
        }
        const { title, description } = this.props.stream;
        return (
            <div>
                <video 
                    ref={this.videoRef} 
                    style={{ width: '100%' }}
                    controls
                />
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
