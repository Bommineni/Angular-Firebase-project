import { BrowserModule } from '@angular/platform-browser';

// Search box
import {Ng2SearchPipeModule} from 'ng2-search-filter';

// For navigating
import {Routing} from './app.routing';

// Req and res calls
import {HttpModule} from '@angular/http';

// Forms
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';

// Editor
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// Components

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AddpostComponent } from './components/addpost/addpost.component';
import { TestComponent } from './components/test/test.component';

// Client-side services

import {TestService} from './services/test.service.client';
import {AddpostService} from './services/addpost.service.client';

// Firebase
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';


@NgModule({
  // Declare components here
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    AddpostComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  // Client Side services here
  providers: [ TestService, AddpostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
