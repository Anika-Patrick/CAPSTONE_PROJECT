import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {

  userMsg = '';
  messages: any[] = [];

  ngOnInit() {
    this.loadChat();
  }

  // 📥 Load chat
  loadChat() {
    const data = localStorage.getItem('fitness_chat');
    this.messages = data ? JSON.parse(data) : [];
  }

  // 💾 Save chat
  saveChat() {
    localStorage.setItem('fitness_chat', JSON.stringify(this.messages));
  }

  // 💬 Send message
  sendMsg() {
    if (!this.userMsg) return;

    const time = new Date().toLocaleTimeString();

    this.messages.push({
      sender: 'User',
      text: this.userMsg,
      time
    });

    this.userMsg = '';
    this.saveChat();
  }
}