import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule], // ✅ FIXED
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  messages: any[] = [];
  adminMsg = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadChat();
  }

  loadChat() {
    const data = localStorage.getItem('fitness_chat');
    this.messages = data ? JSON.parse(data) : [];
  }

  saveChat() {
    localStorage.setItem('fitness_chat', JSON.stringify(this.messages));
  }

  sendReply() {
    if (!this.adminMsg) return;

    const time = new Date().toLocaleTimeString();
    this.messages.push({
      sender: 'Admin',
      text: this.adminMsg,
      time
    });

    this.adminMsg = '';
    this.saveChat();
    this.loadChat();
  }

  logout() {
    this.router.navigate(['/home']);
  }
}