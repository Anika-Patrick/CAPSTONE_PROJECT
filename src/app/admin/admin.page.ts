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
  currentUserSummary: any = null;
  userTable: any[] = [];
  ratingSummary: any[] = [];

  ngOnInit() {
    this.loadChat();
    this.loadCurrentUserSummary();
    this.userTable = this.loadUserTable();
    this.ratingSummary = this.getRatingsSummary();
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

  loadCurrentUserSummary() {
    const raw = localStorage.getItem('current_user');
    const user = this.parseUser(raw);
    const username = user?.username || user;
    if (!username) return;

    const profile = JSON.parse(
      localStorage.getItem(`${username}_fitness_profile`) || '{}'
    );
    const extra = JSON.parse(
      localStorage.getItem(`${username}_fitness_extra`) || '{}'
    );

    this.currentUserSummary = {
      username,
      weight: profile.weight || '--',
      height: profile.height || '--',
      bmi: this.calculateBmi(profile.weight, profile.height),
      calories: extra.calories || 0,
      goal: profile.goalType || 'N/A',
      streak: extra.streak || 0,
      lastLoginDate: extra.lastLoginDate || '--'
    };
  }

  loadUserTable() {
    const users = JSON.parse(
      localStorage.getItem('fitness_users') || '[]'
    );
    if (!Array.isArray(users)) return [];

    return users.map((user: any) => {
      const profile = JSON.parse(
        localStorage.getItem(`${user.username}_fitness_profile`) || '{}'
      );
      const extra = JSON.parse(
        localStorage.getItem(`${user.username}_fitness_extra`) || '{}'
      );
      return {
        username: user.username,
        weight: profile.weight || '--',
        height: profile.height || '--',
        goal: profile.goalType || 'N/A',
        streak: extra.streak || user.streak || 0,
        lastLoginDate: extra.lastLoginDate || user.lastLoginDate || '--'
      };
    });
  }

  getRatingsSummary() {
    const raw = localStorage.getItem('fitness_ratings') || '[]';
    let ratings: any[] = [];

    try {
      ratings = JSON.parse(raw);
    } catch {
      ratings = [];
    }

    if (!Array.isArray(ratings)) {
      ratings = Object.entries(ratings).map(([username, stars]: any) => ({
        username,
        stars,
        time: ''
      }));
    }

    const summary = ratings.reduce((acc: any, rating: any) => {
      const username = rating.username || 'Unknown';
      if (!acc[username]) {
        acc[username] = { username, total: 0, count: 0 };
      }
      acc[username].total += Number(rating.stars || 0);
      acc[username].count += 1;
      return acc;
    }, {});

    return Object.values(summary).map((item: any) => ({
      username: item.username,
      average: (item.total / item.count).toFixed(1),
      count: item.count
    }));
  }

  calculateBmi(weight: number, height: number) {
    if (!weight || !height) return '--';
    const h = height / 100;
    return (weight / (h * h)).toFixed(1);
  }

  parseUser(raw: string | null): any {
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }

  clearAllChats() {
    this.messages = [];
    this.saveChat();
  }
}