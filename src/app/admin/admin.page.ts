import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss']
})
export class AdminPage implements OnInit {

  messages: any[] = [];
  adminMsg = '';

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

    if (!this.adminMsg.trim()) return;

    this.messages.push({
      sender: 'admin',
      username: 'Fitness Coach',
      text: this.adminMsg,
      time: new Date().toLocaleTimeString()
    });

    this.adminMsg = '';
    this.saveChat();
  }

  getRatings() {
    return JSON.parse(localStorage.getItem('fitness_ratings') || '{}');
  }

  clearAllChats() {
    this.messages = [];
    this.saveChat();
  }
}