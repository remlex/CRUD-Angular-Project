import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private uService : UserService, private router : Router){
  }

  canActivate(): boolean{
    if(this.uService.loggedIn()){
      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }
  }
}
