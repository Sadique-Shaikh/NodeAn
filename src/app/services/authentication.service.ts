import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from '../api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }


  getDetails(): Observable<any> {
    const token = sessionStorage.getItem('token');

    if (!token) {
      // Handle the case where token is missing or expired
      return throwError('Token not found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log("headers:", headers);

    return this.http.get(`${API_ENDPOINTS.USER_DETAILS}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINTS.LOGIN_USER, user).pipe(catchError(this.handleError));
  }

  registerUser(
    firstName: string,
    lastName: string,
    gender: string,
    phoneNo: string,
    email: string,
    designation: string,
    dob: string,
    age: string,
    image: string,
    country: string,
    state: string,
    city: string,
    pinCode: string,
    password: string): Observable<any> {

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('gender', gender);
    formData.append('phoneNo', phoneNo);
    formData.append('email', email);
    formData.append('designation', designation);
    formData.append('dob', dob);
    formData.append('age', age);
    formData.append('image', image);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('pinCode', pinCode);
    formData.append('password', password);

    return this.http.post<any>(API_ENDPOINTS.REGISTER_USER, formData).pipe(catchError(this.handleError));
  }

  setToken(token: any) {
    // localStorage.setItem("token", token);
    sessionStorage.setItem("token", token);
  }
  getToken(): any {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem("token");
    }
  }

  removeToken() {
    // localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    this.router.navigate(["dashboard"]);
    return true;
  }

  private handleError(error: any) {
    console.error('API error: ', error);
    return throwError(error);
  }
}
