import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  apiUrl = 'http://localhost:3000/songs';

  constructor(private http: HttpClient) {}

  getSongs() {
    return this.http.get(this.apiUrl);
  }

}