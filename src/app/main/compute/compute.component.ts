import { Component,ViewContainerRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../shared/user.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-compute',
  templateUrl: './compute.component.html',
  styleUrls: ['./compute.component.css'],

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
export class ComputeComponent implements OnInit {

  // public computeForm = {
  //   qty: '',
  //   unit_price: '',
  // }

  //public invoiceDetailForm: FormGroup;
  
  private Url : string = "http://localhost:8000/api/v1/users";
  messageList$ : Object;
  private vat = 0.05;

  private companies : any;
  private id : any;
  angForm: any;
  // private computeForm: FormGroup;
  // this.computeForm = this.formBuilder.group({
  //   route: ['', Validators.required],
  //   qty: ['', Validators.required],
  //   unit_price:['', Validators.required],
  //   amount:'',
  //   total: false
  // });

  public computeForm = {
    route: null,
    qty : null,
    unit_price:null,
    amount: null,
    total: null,
    username: null
  };

  // this.computeForm = this.formBuilder.group({
  //   username: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.compose([
  //     Validators.required,
  //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  //   ]))
  // });
  public res : any;
  private username: string;
  private user_id: string;
  private confirm: any;

  constructor(private http: HttpClient, 
    public userService: UserService, 
    private route:ActivatedRoute, 
    private router: Router,
    public toastr: ToastsManager, vcr: ViewContainerRef
    ) {
      this.toastr.setRootViewContainerRef(vcr);
   }

  //  createForm() {
  //   this.angForm = this.fb.group({
  //     route: ['', Validators.required ],
  //     qty: ['', Validators.required ],
  //     unit_price: ['', Validators.required ],
  //     amount: ['', Validators.required ],
  //     username: ['', Validators.required ]
  //  });
  // }

  ngOnInit() {
    
  }

  fetchVal(){
    // alert(this.computeForm.route);
    this.computeForm.username = localStorage.getItem('username');
    switch (this.computeForm.route) {      
      case 'corporate':
          var p0 = 2.0;
          var p1 = 1.85;
          var p2 = 1.80;
          var qty = this.computeForm.qty;
          if(qty <= 1000 || qty < 99999){
            var uprice = p0;
            // var uprice = (p0 * qty) / qty;
            var amount = uprice * qty;
            var tax = amount * 0.05;
            var total = tax + amount;
            this.computeForm.amount = amount;
            this.computeForm.unit_price = uprice;
            this.computeForm.total = total;
            break;
          }else if(qty <= 100000 || qty < 999999){
            var uprice = p1;
            var amount = uprice * qty;
            var tax = amount * 0.05;
            var total = tax + amount;
            this.computeForm.amount = amount;
            this.computeForm.unit_price = uprice;
            this.computeForm.total = total;
            break;
          }else if(qty <= 1000000 || qty < 10000000){
            var uprice = p2;
            var amount = uprice * qty;
            var tax = amount * 0.05;
            var total = tax + amount;
            this.computeForm.amount = amount;
            this.computeForm.unit_price = uprice;
            this.computeForm.total = total;
            break;
          }
      case 'alpha':
            var p3 = 1.7;
            var p4 = 1.3;
            var p5 = 1.0;
            var qty = this.computeForm.qty;
            if(qty <= 1000 || qty < 99999){
              var uprice = p3;
              var amount = uprice * qty;
              var tax = amount * 0.05;
              var total = tax + amount;
              this.computeForm.amount = amount;
              this.computeForm.unit_price = uprice;
              this.computeForm.total = total;
              break;
            }else if(qty <= 100000 || qty < 999999){
              var uprice = p4;
              var amount = uprice * qty;
              var tax = amount * 0.05;
              var total = tax + amount;
              this.computeForm.amount = amount;
              this.computeForm.unit_price = uprice;
              this.computeForm.total = total;
              break;
            }else if(qty <= 1000000 || qty < 10000000){
              var uprice = p5;
              var amount = uprice * qty;
              var tax = amount * 0.05;
              var total = tax + amount;
              this.computeForm.amount = amount;
              this.computeForm.unit_price = uprice;
              this.computeForm.total = total;
              break;
            }
        }
      }

      routeVal(){
        this.computeForm.amount = "";
        this.computeForm.unit_price = "";
        this.computeForm.total = "";
        this.computeForm.qty = "";
      }

  getUsername(){
    return this.username = localStorage.getItem('username');
    // return this.username = this.userService.api_token;
  }

  getUserId(){
    return this.user_id = localStorage.getItem('id');
    // return this.username = this.userService.api_token;
  }


  addProduct(){
    // this.route.snapshot.params["id"]
    this.userService.addProduct(this.computeForm)
      .subscribe( res => {
          // let id = res['id'];
          this.router.navigate(['/compute']);
          this.showSuccess();
          // this.router.navigate(['/confirm', id]) 
          this.reset();
        },
        err => console.log(err)
      )
  }

  reset(){
    this.computeForm.amount = "";
    this.computeForm.qty ="";
    this.computeForm.route = "";
    this.computeForm.username = "";
    this.computeForm.unit_price = "";
    this.computeForm.total = "";
  }

  // createForm(data){
  // this.studentAddForm = this.formBuilder.group({
  //   first_name: [data.studentData.first_name,  [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
  //   last_name: [data.studentData.last_name,  [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
  //   phone: [data.studentData.phone,  [Validators.required,ValidationService.checkLimit(5000000000,9999999999)]],
  //   email: [data.studentData.email,  [Validators.required, ValidationService.emailValidator]]
  // });
  // }

  showSuccess() {
    this.toastr.success('Added Successful!', 'Success!');
  }
  showError() {
    this.toastr.error('Could not add record!', 'Oops!');
  }

}
