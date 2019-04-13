import React, { Component } from 'react';

class GoogleAuth extends Component{

    state = {
        isSignedIn: null
    };

    componentWillMount(){
        window.gapi.load('client:auth2', async () => {
            await window.gapi.client.init({
                clientId: 
                    '619755407673-8l178e1pouo2gtnddvjj5fqv83eadc62.apps.googleusercontent.com',
                scope: 'email'
            });
            this.auth = window.gapi.auth2.getAuthInstance(); 
            this.setState({ isSignedIn: this.auth.isSignedIn.get() });
            this.auth.isSignedIn.listen(this.onAuthChange);
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    trySignIn = () => {
        this.auth.signIn();
    }

    trySignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton(){
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button className='ui red google button' onClick={ this.trySignOut }>
                    <i className='google icon' />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className='ui red google button' onClick={ this.trySignIn }>
                    <i className='google icon' />
                    Sign In with Google
                </button>
            );
        }
    }

    render(){
        return (
                <div>{ this.renderAuthButton() }</div>
        );
    };

}

export default GoogleAuth;
