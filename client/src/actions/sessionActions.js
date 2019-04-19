import { 
    PROVIDE_STREAM,
    CLEAR_STREAM
} from '../actions/types';
import history from '../history';

export const provideStream = (id, command) => async dispatch => {
    await dispatch({
        type: PROVIDE_STREAM,
        payload: id
    });
    history.push(`/streams/${command}`);
}

export const clearStream = () => dispatch => {
    dispatch({
        type: CLEAR_STREAM,
        payload: null
    });
}
