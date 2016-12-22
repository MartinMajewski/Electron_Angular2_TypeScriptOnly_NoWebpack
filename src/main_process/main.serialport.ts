import * as SerialPort from 'serialport';


export function getSerialPortList(event: Electron.IpcMainEvent) {

    var ports: SerialPort.portConfig[] = [{
        comName: 'No Port',
        manufacturer: "None",
        serialNumber: "NaN",
        pnpId: "NaN",
        locationId: "NaN",
        vendorId: "NaN",
        productId: "NaN",
    }]

    SerialPort.list((err, pts) => {

        // console.log('---> SerialPort list')
        ports = pts
        // ports.forEach(function (port) {
        //     console.log(port.comName);
        //     console.log(port.pnpId);
        //     console.log(port.manufacturer);
        // });

        // console.log('SerialPort list ---> ')

        event.sender.send('setSerialPortList', ports)
    });
}
