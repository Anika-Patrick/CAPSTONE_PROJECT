import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  username = '';
  password = '';
  users: any[] = [];

  constructor(private router: Router) {}

  // ================= INIT =================
  ngOnInit() {
    this.loadUsers();
  }

  // ================= LOAD USERS =================
  loadUsers() {
    const data = localStorage.getItem('fitness_users');
    this.users = data ? JSON.parse(data) : [];
  }

  // ================= SAVE USERS =================
  saveUsers() {
    localStorage.setItem('fitness_users', JSON.stringify(this.users));
  }

  // ================= SET CURRENT USER =================
  setCurrentUser(user: any) {

    localStorage.setItem('current_user', JSON.stringify(user));

    localStorage.setItem('current_profile', JSON.stringify({
      username: user.username,
      loginTime: new Date().toISOString()
    }));
  }

  // ================= LOGIN =================
  login() {

    // ADMIN
    if (this.username === 'admin' && this.password === '5678') {

      const admin = { username: 'admin' };
      this.setCurrentUser(admin);

      this.router.navigate(['/admin']);
      return;
    }

    // DEFAULT USER
    if (this.username === 'user' && this.password === '1234') {

      const user = { username: 'user' };
      this.setCurrentUser(user);

      this.router.navigateByUrl('/bmi');
      return;
    }

    // REGISTERED USERS
    const user = this.users.find(
      u =>
        u.username === this.username &&
        u.password === this.password
    );

    if (user) {

      this.setCurrentUser(user);

      this.router.navigateByUrl('/bmi');

    } else {
      alert('User not found. Please register first.');
    }
  }

  // ================= REGISTER =================
  register() {

    if (!this.username || !this.password) {
      alert('Please enter username and password');
      return;
    }

    const exists = this.users.find(
      u => u.username === this.username
    );

    if (exists) {
      alert('User already exists');
      return;
    }

    const newUser = {
      username: this.username,
      password: this.password,
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);
    this.saveUsers();

    // 🔥 IMPORTANT FIX: auto set current user after register
    this.setCurrentUser(newUser);

    alert('Registered successfully! Now login.');

    this.username = '';
    this.password = '';
  }
}