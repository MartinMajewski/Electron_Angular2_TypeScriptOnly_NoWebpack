import { Injectable } from '@angular/core'
import * as SerialPort from 'serialport';
import SerialPortService from '../services/serialport.service';
import { SerialPortState } from '../app.state';
import { NgRedux, } from 'ng2-redux';
import { IAppState } from '../app.state';


export enum Types {
    REFRESH_SERIALPORT_LIST = 'REFRESH_SERIALPORT_LIST' as any,
    REFRESHING_SERIALPORT_LIST = 'REFRESHING_SERIALPORT_LIST' as any,
    REFRESHED_SERIALPORT_LIST = 'REFRESHED_SERIALPORT_LIST' as any,
}

export interface Action {
    type: Types,
    state?: SerialPortState
}

@Injectable()
export default class SerialPortActions {

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private serialPortService: SerialPortService
    ) { }

    refreshPortList() {

        this.ngRedux.dispatch(this.refreshingPortList())

        return this.serialPortService.getListOfAvailablePorts()
            .then(portList => {
                this.ngRedux.dispatch(this.refreshedPortList(portList))
            })
            .catch(err => { console.log(err) })
    }

    refreshingPortList(): Action {
        return {
            type: Types.REFRESHING_SERIALPORT_LIST,
        }
    }

    refreshedPortList(payload: SerialPort.portConfig[]): Action {
        return {
            type: Types.REFRESHED_SERIALPORT_LIST,
            state: {
                portList: payload
            }
        }

    }

}
