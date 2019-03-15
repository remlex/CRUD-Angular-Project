import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AlertPromise } from 'selenium-webdriver';
import { UserService } from '../../shared/user.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

  animations: [
    trigger('regStagger', [
      transition('* => *', [

        query(':enter', 
        [
            style({opacity: 0, transform: 'translateX(25%)' }),
            stagger('50ms',
            animate('550ms ease-out',
         style({opacity: 1, transform: 'translateX(0px)'  })))
          ], {optional: true }),
        query(':leave', animate('50ms', style({opacity: 0  })), {
              optional: true
          })
        ])
     ])
  ]
  
})
export class RegisterComponent implements OnInit {

  public form = {
    email: '',
    password: ''
  }

  public regForm = { }
  // firstname: ['', Validators.required],

  constructor(private http: HttpClient, private router : Router, private uService : UserService ) { }

  ngOnInit() {
    //// copy from other work 
    // this.registerForm = this.formBuilder.group({
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     username: ['', Validators.required],
    //     password: ['', [Validators.required, Validators.minLength(6)]]
    // });
  }

  onSubmit(){
    //// copy from other work  register
    // this.userService.register(this.registerForm.value)
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.alertService.success('Registration successful', true);
    //                 this.router.navigate(['/login']);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });

    //========================================
    //// copy from other work  login
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.router.navigate([this.returnUrl]);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
  }

  registerUser(){
    return this.uService.addUsers(this.regForm)
      .subscribe( res => {
          console.log(res)
          //this.alertService.success('Registration Successful', true);
          if(res['success'] == true){
            // localStorage.setItem('api_token', res.api_token);
            this.router.navigate(['view_record']);
          }          
        },
        err => console.log(err)
      )
  }

  editRegister(id){
    return this.uService.getUserRecord(id)
      .subscribe( res => {
          console.log(res)

          // if(res['success'] == true){
          //   // localStorage.setItem('api_token', res.api_token);
          //   this.router.navigate(['view_record']);
          // }         
        },
        err => console.log(err)
      )
  }
    


}
