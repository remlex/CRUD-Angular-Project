import { Component,ViewContainerRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-edit-register',
  templateUrl: './edit-register.component.html',
  styleUrls: ['./edit-register.component.css']
})
export class EditRegisterComponent implements OnInit {

  index:any;
  vresults: any = {};
  regDetail:any;
  regRecords:any;

  profileForm = new FormGroup({  
    id: new FormControl(''),
    firstname: new FormControl(''),  
    lastname: new FormControl(''),  
    email: new FormControl(''),  
    phone: new FormControl(''),  
    address: new FormControl(''), 
    username: new FormControl(''),
    type: new FormControl(''),
    roles: new FormControl(''),
    status: new FormControl(''),
    password: new FormControl(''),      
    });

    customerForm : any;
 
   
  constructor(private router: Router, private route: ActivatedRoute, public userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef /*, private fb: FormBuilder */) {  
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getUserRecordId(this.route.snapshot.params["id"]);
    // this.getUserRecordId();
    
  }

  getUserRecordId(id){
    //const id = this.route.snapshot.params["id"];
    this.userService.getProductId(id).subscribe(res =>{ 
      this.vresults = res;
    });
  }

  updateRegister(id){
    //let sid = this.route.snapshot.params["id"];
    this.userService.updateRecord(id, this.vresults).subscribe(res =>{ 
          this.profileForm.patchValue({
              firstname : res.firstname,
              lastname : res.lastname,
              email : res.email,
              phone : res.phone,
              address : res.address,
              username : res.username,
              type : res.type,
              roles : res.roles,
              status : res.status,
          });
          this.showSuccess();
          this.router.navigate(['/view_record']) ;
      });
  }
      
  // onUserSave(user: User){
  //     let newUser = {
  //         name: user.name,
  //         role: user.role,
  //         email: user.email,
  //         password: user.password,
  //     }
  //     if(this.flag == 'create'){
  //         this.addUserForm.reset();
  //         this.dataStorageService.storeUsers(newUser);
  //     }else{
  //         this.dataStorageService.editUser(this.userId, newUser);
  //     }
  //     this.modalRef.close();
  //     this.addUserForm.reset();
  // }

  showSuccess() {
    this.toastr.success('Update Successful!', 'Success!');
    // alert('Update Successful!');
  }

}
