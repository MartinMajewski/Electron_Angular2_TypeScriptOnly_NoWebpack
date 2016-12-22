import * as Ng from '@angular/core';
import { ipcRenderer } from 'electron'
import * as SerialPort from 'serialport';

@Ng.Injectable()
export default class SerialPortService {

    constructor(
        private ngZone: Ng.NgZone
    ) { }


    getListOfAvailablePorts(): Promise<SerialPort.portConfig[]> {

        return new Promise((resolve, reject) => {
            ipcRenderer.on('setSerialPortList', (event, args) => {
                this.ngZone.run(() => {
                    let ports = args as SerialPort.portConfig[]
                    ports.map(port => {
                        console.log(port.comName)
                    })

                    if (ports !== null) {
                        resolve(ports)
                    }
                    else {
                        reject('PortList is null')
                    }
                })
            })

            ipcRenderer.send('getSerialPortList', "Hello again!")
        })
    }
}
