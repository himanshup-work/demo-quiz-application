import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthRequest, IAuthResponse } from '../../model/auth.model';
import { Observable } from 'rxjs';
import { IUserRegistration } from '../../model/user.model';

const BASE_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(authRequest: IAuthRequest): Observable<any> {
    return this.http.post(BASE_URL + "auth/login", authRequest);
  }

  signup(userDTO: IUserRegistration): Observable<any> {
    return this.http.post(BASE_URL + "auth/signup", userDTO);
  }

}
