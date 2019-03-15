import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router : Router, private uService : UserService) { }

  ngOnInit() {
  }

  logout(){
    this.uService.logoutUser();
    this.router.navigate(['']);
  }

}
