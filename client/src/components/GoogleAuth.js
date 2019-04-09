import React, { Component } from 'react';

class GoogleAuth extends Component{

    async componentDidMount(){
        await window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: 
                    '619755407673-8l178e1pouo2gtnddvjj5fqv83eadc62.apps.googleusercontent.com',
                scope: 'email'
            });
        });
        const auth = await window.gapi.auth2.getAuthInstance();
        auth.signIn();
    }

    render(){
        return (
                <div>
                    <p>GoogleAuth</p>
                </div>
        );
    };

}

export default GoogleAuth;
