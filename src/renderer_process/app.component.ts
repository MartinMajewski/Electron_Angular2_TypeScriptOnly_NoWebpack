import * as Ng from '@angular/core'

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from 'ng2-redux';

import * as SerialPort from 'serialport'

import { IAppState } from './app.state';
import SerialPortActions from './actions/serialport.actions';
import SerialPortService from './services/serialport.service';


@Ng.Component({
    selector: 'app',
    providers: [
        SerialPortActions,
        SerialPortService
    ],
    template: `
    <div>
        <h2>{{ portList$.length }} Ports Available</h2>
        <ul>
            <li *ngFor='let port of portList$ | async'>
                {{ port.comName }}
            </li>
        </ul>
        <button (click)="refreshPortList()">Refresh</button>    
    </div>`,
})
export class AppComponent {

    @select([ 'serialPortState', 'portList' ]) portList$: Observable<SerialPort.portConfig[]>

    constructor(
        public actions: SerialPortActions,
        private ngRedux: NgRedux<IAppState>
    ) {
        this.refreshPortList()
    }

    refreshPortList() {
        console.log('clicked on refreshPortList')
        this.actions.refreshPortList()
    }

}
