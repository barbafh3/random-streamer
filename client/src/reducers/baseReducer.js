import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import streamReducer from './streamReducer';
import sessionReducer from './sessionReducer';

// export default combineReducers({
//     auth: authReducer,
//     form: formReducer,
//     streams: streamReducer,
//     session: sessionReducer
// });

export default combineReducers({
    form: formReducer,
    streams: streamReducer,
    session: combineReducers({
        auth: authReducer,
        provider: sessionReducer
    })
});
