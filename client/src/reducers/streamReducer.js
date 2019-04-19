import _ from 'lodash';

import { 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type){
        case CREATE_STREAM:
            return {
                ...state,
// Adds, replaces or fetches an item on the state object
// with id field equal to action.payload.id
                [action.payload.id]: action.payload
            };
        case EDIT_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case FETCH_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case FETCH_STREAMS:
            return {
                ...state,
// lodash.mapKeys() creates an object with many inner objects with 
// key = id and action.payload content as the inner object content
// Example result: {
//          1: { id: 1, title: 'title', description: 'description' } }
//          2: { id: 2, title: 'title 2', description: 'description 2' } }
// }         
                ..._.mapKeys(action.payload, 'id')
            }
        case DELETE_STREAM:
// lodash.omit() creates a new object after removing the provided data
            return _.omit(state, action.payload);
        default:
            return state;
    }
};
