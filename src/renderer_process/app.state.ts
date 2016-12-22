import * as SerialPort from 'serialport'

export interface IAppState{
    serialPortState?: SerialPortState
}

export class SerialPortState{
    portList: SerialPort.portConfig[] = [{
        comName: 'NoPortFound',
        manufacturer: "None",
        serialNumber: "NaN",
        pnpId: "NaN",
        locationId: "NaN",
        vendorId: "NaN",
        productId: "NaN",
    }]
}
