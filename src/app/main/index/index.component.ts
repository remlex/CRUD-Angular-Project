import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { UserService } from '../../shared/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public loginForm = { 
    email: '',
    password: ''
  }
  
  // isLoginError : boolean = false;
  users : any;
  message: string;
  // api_token : any;
  constructor(
    private http : HttpClient, 
    private router : Router, 
    private userService : UserService,
    public toastr: ToastsManager, vcr: ViewContainerRef
    ) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
  }

  onSubmit(){
    return this.userService.loginUsers(this.loginForm)
        .subscribe( data => {
          // if(data.status == 'fail'){
          //   this.message = "Username or Password Invalid";
          // }
          localStorage.setItem('api_token', data.api_token),
          localStorage.setItem('username', data.Username),
          //localStorage.setItem('email', data.email),
          // this.showSuccess();
          this.router.navigate(['/dashboard']);
          this.showSuccess();    
          
          
        },
        error => console.log(error)
      )
  }

  showSuccess() {
    this.toastr.success('Login Successful!', 'Success!');
  }
  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }
  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }
  showInfo() {
    this.toastr.info('Just some information for you.');
  }


  logout(){
    // localStorage.setRemove('api_token');
    localStorage.removeItem('api_token');
    this.router.navigate(['']);
  }

  

}
