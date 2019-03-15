import { Routes } from '@angular/router';

import { RegisterComponent } from './main/register/register.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { IndexComponent } from './main/index/index.component';
import { NavComponent } from './includeMod/nav/nav.component';
import { EdituserComponent } from './main/edituser/edituser.component';
import { ProductsComponent } from './main/products/products.component';

const appRoutes: Routes = [
    // { path: '/', component: AppComponent },
    { path: '', component: IndexComponent }, /* , canActivate:[AuthGuard] */
    { path: 'register', component: RegisterComponent },
    { path: 'view_record', component: EdituserComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'logout', component: NavComponent },
  ]