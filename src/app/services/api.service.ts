import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  saveUser(data: any) {

    return this.http.post(this.apiUrl, data);
  }
}