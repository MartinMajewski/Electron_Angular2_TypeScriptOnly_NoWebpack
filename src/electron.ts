/** Added or modified by MartinMajewski - www.martinmajewski.net */

'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

import * as SerialPort from './main_process/main.serialport'

import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { __DEV_MODE__ } from './configuration';
 


export default class MainElectronWindow {
    private constructor() { }

    static mainWindow: Electron.BrowserWindow
    static application: Electron.App
    static ipc: Electron.IpcMain
    static BrowserWindow

    private static onWindowAllClosed() {
        MainElectronWindow.application.quit()
        // Uncomment this, if you don't want the application to quit when closing the last window
        // This is the known behavior of macOS, but it annoys me, especially during development.
        // if (process.platform !== 'darwin'){
        //     MainElectronWindow.application.quit()
        // }
    }

    private static onClose() {
        // Dereference the window object.
        MainElectronWindow.mainWindow = null
    }

    private static onReady() {

        MainElectronWindow.mainWindow = new MainElectronWindow.BrowserWindow({
            width: 400,
            height: 400,
            webPreferences: {
                nodeIntegration: true
            }
        })

        installExtension(REDUX_DEVTOOLS)
            .then(name => console.log('Added Extension: ' + name))
            .catch(err => console.log('An error occurred: ' + err));

        MainElectronWindow.mainWindow.on('unresponsive', MainElectronWindow.onUnresponsive)  
        MainElectronWindow.mainWindow.on('closed', MainElectronWindow.onClose)
        MainElectronWindow.mainWindow.webContents.on('crashed', MainElectronWindow.onCrashed)

        MainElectronWindow.mainWindow.loadURL('file://' + __dirname + '/renderer_process/index.html')
    }

    private static onCrashed(err: Error) {
        console.log('onUncaughtException' + err)
    }

    private static onUnresponsive() {
        console.log('Window is unresponsive!')
    }

    private static onUncaughtException(err: Error) {
        console.log('onUncaughtException' + err)
    }

    // private static onIPCCallExampleFunction() {
    //     MainElectronWindow.mainWindow.loadURL('file://' + __dirname + '/another.html')
    // }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow, ipcMain: Electron.IpcMain) {

        require('electron-debug')({
            enabled: __DEV_MODE__,
            showDevTools: 'undocked',
        })

        // we pass the Electron.App object and the 
        // Electron.BrowserWindow into this function
        // so this class1 has no dependencies.  This
        // makes the code easier to write tests for

        MainElectronWindow.BrowserWindow = browserWindow

        MainElectronWindow.application = app
        
        MainElectronWindow.application.on('window-all-closed', MainElectronWindow.onWindowAllClosed)

        MainElectronWindow.application.on('ready', MainElectronWindow.onReady)

        process.on('uncaughtException', MainElectronWindow.onUncaughtException)  

        ipcMain.on('getSerialPortList', (event, arg) => {
            // Run the following function at the main process            
            SerialPort.getSerialPortList(event)
        })


    }
}

// Main entry point - needed, because we are still living in a world suffering from vanilla JavaScript
MainElectronWindow.main(app, BrowserWindow, ipcMain)
