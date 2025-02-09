import { Injectable } from '@angular/core';
import { ILoggedInUser } from '../../model/user.model';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveLoggedInUser(user: ILoggedInUser){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken() {
    return window.localStorage.getItem(TOKEN);
  }

  static getLoggedInUser(): ILoggedInUser{
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserRole(){
    const user: ILoggedInUser = this.getLoggedInUser();
    return user ? user.userRole : null;
  }

  static getUserId(){
    const user: ILoggedInUser = this.getLoggedInUser();
    return user ? user.userId : null;
  }

  static isAdminLoggedIn(): boolean {
    if(this.getToken === null) return false;
    const role = this.getUserRole();
    return role === "ADMIN";
  }

  static isUserLoggedIn(): boolean {
    if(this.getToken === null) return false;
    const role = this.getUserRole();
    return role === "USER";
  }

  static hasToken(): boolean {
    return this.getToken !== null;
  }

  static signout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}
