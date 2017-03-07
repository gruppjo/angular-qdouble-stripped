/**
 * This module is the entry for your App when NOT using universal.
 *
 * Make sure to use the 3 constant APP_ imports so you don't have to keep
 * track of your root app dependencies here. Only import directly in this file if
 * there is something that is specific to the environment.
 */

import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { Store } from '@ngrx/store';
import { AppState } from './reducers';

// DECLARATIONS
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard.component';
import { NotFound404Component } from './not-found404.component';

// PROVIDERS
import { UserActions } from './user/user.actions';
import { UserService } from './user/user.service';

// IMPORTS
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { routes } from './app.routing';
import { rootReducer } from './reducers';
import { UserEffects } from './user/user.effects';


export const APP_IMPORTS = [
  EffectsModule.run(UserEffects),
  ReactiveFormsModule,
  IdlePreloadModule.forRoot(), // forRoot ensures the providers are only created once
  RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: IdlePreload }),
  RouterStoreModule.connectRouter(),
  StoreModule.provideStore(rootReducer),
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFound404Component
  ],
  imports: [
    APP_IMPORTS,
    BrowserModule,
    HttpModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    UserActions,
    UserService
  ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef,
    private _store: Store<AppState>) { }

  hmrOnInit(store) {
    if (!store || !store.rootState) return;

    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this._store.dispatch({
        type: 'SET_ROOT_STATE',
        payload: store.rootState
      });
    }

    if ('restoreInputValues' in store) { store.restoreInputValues(); }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    this._store.take(1).subscribe(s => store.rootState = s);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
