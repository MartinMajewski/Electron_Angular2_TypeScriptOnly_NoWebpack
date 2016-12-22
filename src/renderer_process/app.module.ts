import { __DEV_MODE__ } from '../configuration';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux'
import CombinedReducer from './reducers/root.reducer';
import { IAppState } from './app.state';

const createLogger = require( 'redux-logger');


const middleware = [
  createLogger()
]

@NgModule({
  imports: [
    BrowserModule,
    NgReduxModule.forRoot(),
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    DevToolsExtension
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension) {

    let enhancers = [];
    // ... add whatever other enhancers you want.

    // You probably only want to expose this tool in devMode.
    if (__DEV_MODE__ && devTools.isEnabled()) {
      enhancers = [ ...enhancers, devTools.enhancer() ];
    }

    this.ngRedux.configureStore(
      CombinedReducer,
      {},
      middleware,
      enhancers);
    
    //debugger
  }
  
}
