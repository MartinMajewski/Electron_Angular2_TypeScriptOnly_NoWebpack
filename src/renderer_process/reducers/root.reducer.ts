import { combineReducers } from 'redux';

import SerialPortReducer from './serialport.reducer';
import {IAppState} from '../app.state';

export const CombinedReducer = combineReducers<IAppState>({
    serialPortState: SerialPortReducer

});

export default CombinedReducer
