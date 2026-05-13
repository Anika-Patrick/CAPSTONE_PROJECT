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

  currentUser = 'User';
  showRating = false;

  ngOnInit() {
    const currentUserRaw = localStorage.getItem('current_user');
    const currentUserObject = this.parseCurrentUser(currentUserRaw);

    this.currentUser =
      currentUserObject?.username ||
      (typeof currentUserObject === 'string' ? currentUserObject : 'User');

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

    this.addProfileSummaryMessage(currentUserObject);
  }

  private parseCurrentUser(raw: string | null): any {
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }

  private addProfileSummaryMessage(user: any) {
    const username = user?.username || user;
    if (!username || username === 'User') {
      return;
    }

    const summaryKey = `profile_summary_${username}`;
    if (localStorage.getItem(summaryKey)) {
      return;
    }

    const profile = JSON.parse(
      localStorage.getItem(`${username}_fitness_profile`) || '{}'
    );
    const extra = JSON.parse(
      localStorage.getItem(`${username}_fitness_extra`) || '{}'
    );

    const weight = profile.weight || '--';
    const height = profile.height || '--';
    const bmi = this.calculateBmi(profile.weight, profile.height);
    const calories = extra.calories || 0;

    const text = `Weight: ${weight}kg, Height: ${height}cm, BMI: ${bmi}, Calories Burned: ${calories}`;

    this.messages.push({
      sender: 'user',
      username,
      text,
      time: new Date().toLocaleTimeString()
    });

    localStorage.setItem(summaryKey, 'true');
    this.saveChat();
  }

  private calculateBmi(weight: number, height: number) {
    if (!weight || !height) return '--';
    const h = height / 100;
    return (weight / (h * h)).toFixed(1);
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
    let ratings: any[] = [];
    const raw = localStorage.getItem('fitness_ratings') || '[]';

    try {
      ratings = JSON.parse(raw);
    } catch {
      ratings = [];
    }

    if (!Array.isArray(ratings)) {
      ratings = Object.entries(ratings).map(([username, storedStars]: any) => ({
        username,
        stars: storedStars,
        time: new Date().toISOString()
      }));
    }

    ratings.push({
      username: this.currentUser,
      stars,
      time: new Date().toISOString()
    });

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