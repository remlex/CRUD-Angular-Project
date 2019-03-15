import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import {environment} from "../../environments/environment";

@Injectable()
export class UserService {

  public rootUrl = "http://localhost:8000/api/v1/users";
  public Url : string = "http://localhost:8000/api/v1/users";
  public list: any;
  public api_token = localStorage.getItem('api_token');
  profileForm = {};
 
  appForm: FormGroup;

  upFile : {username:string, fileToUpload:File}

  // private reportUrl = environment.api_server + 'report/';

  // httpOptions = {
  //   headers: new HttpHeaders({ 
  //     'Access-Control-Allow-Origin':'*',
  //     'Authorization':'authkey',
  //     'userid':'1'
  //   })
  // };

  constructor( private http: HttpClient, private router: Router ) { 
  }

  registerUser(regForm){
    return this.http.post(this.rootUrl = '/add/user', regForm);
 }
 
 loginUser(loginForm){
    return this.http.post(this.rootUrl + '/login-access', loginForm);
 }

 public getMessage(){
   return this.http.get<any>(this.Url+'/view_all');
 }

// Get all users
  public get_users(){
    // var api_token = this.api_token;
    // return this.http.get<any>(this.Url +'/record/view_alls/' + 'api_token/'+api_token);
    return this.http.get<any>(this.Url +'/record/view_alls/');
  }

  // Add users
  public addUsers(users){
    return this.http.post<any>(this.Url +'/add/user', users);
  }

  // Add Product
  public addProduct(computeForm){
    // var api_token = this.api_token;
    return this.http.post<any>(this.Url +'/record/product', computeForm); //+ 'api_token/'+api_token
  }

  // Add Product
  public getProductId(id){
    // var api_token = this.api_token;
    return this.http.get<any>(this.Url +'/record/product/'+ id);
  }

  // Get all product
  public get_products(){
    return this.http.get<any>(this.Url +'/record/view_all_prod/');
  }

  // Add Product
  public updateRecord(id, editForm){
    return this.http.put<any>(this.Url+'/update_reg/'+id, editForm);
  }

  // Delete user by id
  public deleteUser(id){
    return this.http.delete<any>(this.Url+'/record/delete_user/' +id);
  }

  // registerNewUser(data: any){
  //   return this.http.post(this.rootUrl+'auth/user', data).map(
  //      (res: Response)=> {
  //         return res = res.json();
  //      }
  //    )
  // }
  
  // Login users
  public loginUsers(users){
    return this.http.post<any>(this.Url +'/login-access', users);
  }

  // This is for guard method
  loggedIn(){
    //!! this will return true if record exist and return false if not exist
    return !!localStorage.getItem('api_token');
  }

  logoutUser(){
    return localStorage.removeItem('api_token');
    // return localStorage.removeItem('username');
  }

  getToken(){
    return localStorage.getItem('api_token');
  }

  //Get all record with authentication token
  public get_all_users(){
    return this.http.get<any>(this.Url +'/allrecord');
  }

  // buildAndShowAreaReport(id) {
  //   let url = this.reportUrl + 'build_show_area_report/' + id;
  //   return this.http.get(url).map((res) => res.json());
  // }

  //Get all record with authentication token
  public getUserRecord(id){
    return this.http.get<any>(this.Url +'/getSchoolRecord/register/id');  ///{id}
  }

  getLoggedInUser(api_token): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': api_token
    })
    return this.http.get(this.rootUrl +'/record/view_all', { headers: headers })
  }

  uploadFile(uploadFormNew){
    return this.http.post(this.rootUrl+'/upload_file', uploadFormNew);
 }

 postFile(username: string, fileToUpload: File) {
  const formData: FormData = new FormData();
  formData.append('picture', fileToUpload, fileToUpload.name);
  formData.append('username', username);
  return this.http.post(this.rootUrl+'/upload_file', formData);
 }

//  postFile(upFile){
//   return this.http.post(this.rootUrl+'/upload_file', this.upFile);
//  }

}
