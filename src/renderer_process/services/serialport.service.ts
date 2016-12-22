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
            // register a callback that waits for the async answer of the refreshed serialport list
            ipcRenderer.on('receivedSerialPortList', (event, args) => {
                // You have to change all properties inside the Angular2 zone,
                // or your views do not update
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

            // Send request for list refreh to the main process.            
            ipcRenderer.send('getSerialPortList')
        })
    }
}
