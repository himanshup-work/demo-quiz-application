import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserUpdate } from '../../model/user.model';
import { StorageService } from '../storage/storage.service';
import { catchError, Observable, throwError } from 'rxjs';
import { IApiResponse } from '../../model/auth.model';

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http : HttpClient) {}

  getUser(): Observable<IApiResponse<IUserUpdate>> {
    const userId = StorageService.getUserId();
    return this.http.get<IApiResponse<IUserUpdate>>(BASE_URL + "user/" + userId).pipe(catchError(this.handleError));
  }

  update(user: IUserUpdate): Observable<IUserUpdate> {
    user.setUserId = StorageService.getUserId;
    return this.http.put<IUserUpdate>(BASE_URL + "user/edit", user);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }

}
