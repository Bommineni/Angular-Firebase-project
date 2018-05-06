
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ModuleWithProviders} from '@angular/core';
import {TestComponent} from './components/test/test.component';
import {AddpostComponent} from './components/addpost/addpost.component';



// Navigations

const APP_ROUTES: Routes = [
  {path: '', component : HomeComponent},
  {path: 'test', component : TestComponent },
  {path: 'addpost', component: AddpostComponent},

];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
