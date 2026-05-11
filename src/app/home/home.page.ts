import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  username = '';
  password = '';
  users: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  ionViewWillEnter() {
    // 🔥 THIS FIXES SCROLL ISSUE
    window.scrollTo(0, 0);
  }

  loadUsers() {
    const data = localStorage.getItem('fitness_users');
    this.users = data ? JSON.parse(data) : [];
  }

  login() {

    this.loadUsers();

    if (!this.username || !this.password) {
      alert('Enter credentials');
      return;
    }

    const user = this.users.find(
      u => u.username === this.username && u.password === this.password
    );

    if (user) {
       // SAVE CURRENT USER
  localStorage.setItem(
    'current_user',
    JSON.stringify(user)
  );
      this.router.navigate(['/bmi']);
    } else {
      alert('User not found');
    }
  }

  goSignup() {
    this.router.navigate(['/signup']);
  }
}