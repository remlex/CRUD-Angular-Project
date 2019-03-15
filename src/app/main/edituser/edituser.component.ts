import { Component,ViewContainerRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UserService } from '../../shared/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],

  animations: [
    trigger('listStagger', [
      transition('* => *', [

        query(':enter', 
        [
            style({opacity: 0, transform: 'translateX(90%)' }),
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
export class EdituserComponent implements OnInit {

  private users : any;
  clicked = false;
  editIndex = null;
  deleteUser : any;

  constructor(
                private http : HttpClient,
                private uService : UserService,
                private router : Router,
                public toastr: ToastsManager, vcr: ViewContainerRef
    ) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
    this.uService.get_users().subscribe( 
      result => this.users = result,
      err => {
        console.log(err);
      }
    );
  }

 
  clickEdit(){
    this.clicked = !this.clicked;
    // this.editIndex = i;
    return console.log('Welcome');
    
  }

  deleteuser(id){
    if(this.confirm()){
      this.uService.deleteUser(id).subscribe((res) =>{
        //this.deleteUser = res;
        this.router.navigate(['/view_record']);
      }, (err) => {
        console.log(err);
      });
    }
    
  }

  confirm(){
    return confirm("Are you sure you want to delete this records!");
  }

  showSuccess() {
    this.toastr.success('Added Successful!', 'Success!');
  }
  showError() {
    this.toastr.error('Could not add record!', 'Oops!');
  }

}
