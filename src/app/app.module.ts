import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './main/login/login.component';
import { RegisterComponent } from './main/register/register.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { HomeComponent } from './main/home/home.component';
import { IndexComponent } from './main/index/index.component';
import { HeaderComponent } from './includeMod/header/header.component';
import { NavComponent } from './includeMod/nav/nav.component';
import { FooterComponent } from './includeMod/footer/footer.component';
import { EdituserComponent } from './main/edituser/edituser.component';
import { ProductsComponent } from './main/products/products.component';
import { ComputeComponent } from './main/compute/compute.component';
import { UserService } from './shared/user.service';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { ConfirmComponent } from './main/confirm/confirm.component';
import { EditRegisterComponent } from './main/edit-register/edit-register.component';

import { Angular4PaystackModule } from 'angular4-paystack';

import {ToastModule} from 'ng2-toastr/ng2-toastr';


const appRoutes: Routes = [
  // { path: '/', component: AppComponent },
  { path: '', component: IndexComponent }, /* , canActivate:[AuthGuard] */
  { path: 'register', component: RegisterComponent , canActivate:[AuthGuard]},
  { path: 'register/:id', component: RegisterComponent , canActivate:[AuthGuard]},
  { path: 'edit_register/:id', component: EditRegisterComponent , canActivate:[AuthGuard]},
  { path: 'view_record', component: EdituserComponent , canActivate:[AuthGuard]},
  { path: 'dashboard', component: DashboardComponent , canActivate:[AuthGuard] },
  { path: 'products', component: ProductsComponent , canActivate:[AuthGuard]},
  { path: 'compute', component: ComputeComponent , canActivate:[AuthGuard]},
  { path: 'confirm', component: ConfirmComponent },
  { path: 'confirm/:id', component: ConfirmComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: IndexComponent },
  { path: 'logout', component: NavComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    IndexComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    EdituserComponent,
    ProductsComponent,
    ComputeComponent,
    ConfirmComponent,
    EditRegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, 
    Angular4PaystackModule,   
    BrowserAnimationsModule, ToastModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, AuthGuard, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
