import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ComputeComponent } from './../compute/compute.component'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  private tt : any;
  id: number;
  sub: any;
  vresult: any;
  product: any;
  public confirmForm = {
    id: null
  };
  constructor(private uService : UserService, private route: ActivatedRoute ) { 
    
      this.sub = this.route.params.subscribe(params =>{
        this.id = +params['id']; //(+) convert string 'id' to a number
        return this.uService.getProductId(this.id)
                  .subscribe(res => this.vresult = res);
      });
      // this.route.params.subscribe(params => {
      //   return this.uService.getProductId(params['id']).subscribe(res =>{ this.vresult = res});
      // });
  }

  ngOnInit() {
    this.getproductId(this.route.snapshot.params["id"]);
    //let id = this.route.snapshot.params["id"]
  }

  getproductId(id) {
    this.uService.getProductId(id).subscribe(res =>{ 
      this.product = res;
      });
    // this.http.get('http://localhost:8080/customer/'+id).subscribe(data => {
    //   this.product = data;
    // });
  }

  // updateProduct(name, price) {
  //     this.route.params.subscribe(params => {
  //     this.uService.getProductrecord(name, price, params['id']);
  //     this.router.navigate(['index']);
  //   });
  // }

  
}
