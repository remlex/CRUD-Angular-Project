import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { FormGroup,  Validators } from '@angular/forms'; //FormBuilder,
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  selectedFile: File;
  public uploadFormNew = { }
  // appForm: FormGroup;
  // myModel: any;
  url : any;
  products: any;
  public uploadForm = {
    pic: '',
    video: '',
    qty: '',
    product: '',
    id: '',
    username2: ''
  }

  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  username : any;
  email : any;

  // productForm = this.fb.group({
  //   firstname: ['', Validators.required],
  //   email: ['', [Validators.required, Validators.email]
  //          ]
  // });

  constructor(
    private http: HttpClient, 
    private router : Router, 
    private uService : UserService,
    // private fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef
    ) {
    //this.myModel = '123';
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getProduct();
  }

  getUsername(){
    return this.username = localStorage.getItem('username');
  }

  //get all product
  getProduct(){
    this.uService.get_products().subscribe( 
      result => this.products = result,
      err => {
        console.log(err);
      }
    );
  }

  onBlurMethod(id){
    //alert(this.uploadForm.testing);
    this.uService.getProductId(id).subscribe(res =>{
      //this.uploadForm.username2 = res.firstname;
      // console.log(res.firstname);
      alert(res['firstname']);
    })
   }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onSubmitProductold(){
    //console.log('Successfully Upload!', this.uploadForm);
    this.uService.uploadFile(this.uploadFormNew)
      .subscribe( res => {
        console.log(res)
          // localStorage.setItem('api_token', res.api_token);
          this.router.navigate(['view_record']);      
      },
      err => console.log(err)
    )
    }

    handleFileInput(file: FileList) {
      this.fileToUpload = file.item(0);
  
      //Show image preview
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
    }
  
    OnSubmit(username,picture){
      // alert('Insert: '+ username + 'image: ' + Image);
     this.uService.postFile(username.value,this.fileToUpload).subscribe(
       data =>{
         console.log('done');
         this.router.navigate(['products']);
         this.showSuccess();
         username.value = '';
         picture.value = null;
         this.imageUrl = "/assets/img/map-marker.png";
       }
     );
    
    }

    showSuccess() {
      this.toastr.success('Added Successful!', 'Success!');
    }
    showError() {
      this.toastr.error('Could not add record!', 'Oops!');
    }

}
