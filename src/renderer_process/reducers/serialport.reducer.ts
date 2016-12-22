import * as SerialPortAction from './../actions/serialport.actions'
import { SerialPortState } from '../app.state';

export default (state: SerialPortState = new SerialPortState(), action: SerialPortAction.Action): SerialPortState => {

    switch (action.type) {
        case SerialPortAction.Types.REFRESH_SERIALPORT_LIST:
            return state
        case SerialPortAction.Types.REFRESHING_SERIALPORT_LIST:
            return state
        case SerialPortAction.Types.REFRESHED_SERIALPORT_LIST:
            return { ...state, portList: action.state.portList }
        default:
            return state
    }
}
