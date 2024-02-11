import { setAccessToken } from '../api/client';
import { addNewUser } from './user/usersSlice';

export const middleware = async (method, params, thunk, { inputMapper, outputMapper }) => {
    setAccessToken(thunk.getState().auth.data.accessToken);
    var mappedParams = map(inputMapper, params);
    var response = await handleErrors(method, mappedParams, thunk.rejectWithValue);
    var mappedResponse = map(outputMapper, response);
    return mappedResponse;
}

const handleErrors = async (method, params, rejectWithValue) => {
    return await method(params)
        .then((response => {
            return response.data;
        }))
        .catch(error => {
            if (error.response) {
                var dataError = error.response.data.error ? error.response.data.error : error.response.data;
                var message = dataError ? (": " + dataError) : "";
                return rejectWithValue({ message: message, code: error.response.status });
            }
            return rejectWithValue({ message: ": " + error.message, code: 0 });
        })
}

const map = (mapper, params) => {
    if (mapper) {
        return mapper(params);
    }
    return params;
}

export const testMiddleware = state => next => action => {
    if (addNewUser.match(action)) {
        console.log(action, 'matches')
    } else {
        console.log(action, 'not matches')
    }
}