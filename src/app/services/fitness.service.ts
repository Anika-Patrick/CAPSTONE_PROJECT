import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {

  private apiUrl = 'http://localhost:3000/chat';

  constructor(private http: HttpClient) {}

  sendMessage(question: string) {
    return this.http.post<any>(this.apiUrl, { question });
  }
}