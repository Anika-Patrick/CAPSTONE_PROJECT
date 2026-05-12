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

  currentUser = '';
  showRating = false;

  ngOnInit() {

    this.currentUser = localStorage.getItem('current_user') || 'User';

    this.loadChat();

    // 👇 AUTO GREETING ONLY ONCE
    const greeted = localStorage.getItem('greet_' + this.currentUser);

    if (!greeted) {
      this.messages.push({
        sender: 'admin',
        username: 'Fitness Coach',
        text: `Hello ${this.currentUser} 👋 I am your fitness coach. How can I help you today?`,
        time: new Date().toLocaleTimeString()
      });

      localStorage.setItem('greet_' + this.currentUser, 'true');
      this.saveChat();
    }
  }

  loadChat() {
    const data = localStorage.getItem('fitness_chat');
    this.messages = data ? JSON.parse(data) : [];
  }

  saveChat() {
    localStorage.setItem('fitness_chat', JSON.stringify(this.messages));
  }

  sendMsg() {

    if (!this.userMsg.trim()) return;

    this.messages.push({
      sender: 'user',
      username: this.currentUser,
      text: this.userMsg,
      time: new Date().toLocaleTimeString()
    });

    this.userMsg = '';
    this.saveChat();
    this.scrollBottom();
  }

  endChat() {
    this.showRating = true;
  }

  submitRating(stars: number) {

    const ratings = JSON.parse(localStorage.getItem('fitness_ratings') || '{}');

    ratings[this.currentUser] = stars;

    localStorage.setItem('fitness_ratings', JSON.stringify(ratings));

    // clear only this user's chat
    this.messages = this.messages.filter(m => m.username !== this.currentUser);

    this.saveChat();

    this.showRating = false;
  }

  scrollBottom() {
    setTimeout(() => {
      const el = document.querySelector('.chat-container');
      if (el) el.scrollTop = el.scrollHeight;
    }, 100);
  }
}