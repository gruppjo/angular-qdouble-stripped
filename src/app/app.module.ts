/**
 * This module is the entry for your App when NOT using universal.
 *
 * Make sure to use the 3 constant APP_ imports so you don't have to keep
 * track of your root app dependencies here. Only import directly in this file if
 * there is something that is specific to the environment.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';

// DECLARATIONS
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard.component';
import { NotFound404Component } from './not-found404.component';

// PROVIDERS

// ROUTES
import { routes } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFound404Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    IdlePreloadModule.forRoot(), // forRoot ensures the providers are only created once
    RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: IdlePreload }),
  ],
  bootstrap: [AppComponent],
  providers: []
})

export class AppModule {
  constructor() { }
}
