import { combineReducers } from 'redux';
import dataReducer from './data/dataSlice';

const rootReducer = combineReducers({
    data: dataReducer,
});

export default rootReducer;
