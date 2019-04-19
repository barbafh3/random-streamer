import { 
    PROVIDE_STREAM,
    CLEAR_STREAM
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type){
        case PROVIDE_STREAM:
            return {
                ...state,
                streamId: action.payload
            }
        case CLEAR_STREAM:
            return {
                ...state,
                streamId: null
            }
        default:
            return state;
    }
};
