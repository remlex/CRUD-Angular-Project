import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private no:number = 23;
   private uname:string = "Solution Night 2018 at Obanikoro";
   private arrnum:number[] = [1,2,3,4];

   private obj = { "name":"xxx", "city":"York"};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // userAuthentication(user){
  //   return this._auth.userAuthentication(user).subscribe((data : any) =>{
  //     localStorage.setItem('userToken', data.access_token);
  //     this.router.navigate(['/dashboard']);
  //   },
  //   (err : HttpErrorResponse) =>{
  //     this.isLoginError = true;
  //   })
  // }

  call(){
    
    console.log(this.no +"-"+ this.uname + " Array Value " + this.arrnum)

    this.test(2, 5);

    this.arrnum.forEach((element)=>console.log(element))
    for(var n of this.arrnum){
        console.log("Value"+ n);
    }
  }

  test(a:number, b:number){
    console.log(a+b)
  }

  javaTest(){
    const myJSON = JSON.stringify(this.obj);
    // const text = myJSON["name"];
    console.log(myJSON);
    
  }

}
