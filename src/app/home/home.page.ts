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

  // 📥 Load users
  loadUsers() {
    const data = localStorage.getItem('fitness_users');
    this.users = data ? JSON.parse(data) : [];
  }

  // 💾 Save users
  saveUsers() {
    localStorage.setItem('fitness_users', JSON.stringify(this.users));
  }

  // 🔐 LOGIN (FIXED)
  login() {

    // ✅ Admin login
    if (this.username === 'admin' && this.password === '5678') {
      this.router.navigate(['/admin']);
      return;
    }

    // ✅ Default user login (1234)
    if (this.username === 'user' && this.password === '1234') {
      this.router.navigateByUrl('/tabs/tab1'); // 🔥 FIX
      return;
    }

    // ✅ Registered users
    const user = this.users.find(
      u => u.username === this.username && u.password === this.password
    );

    if (user) {
      this.router.navigateByUrl('/tabs/tab1'); // 🔥 FIX
    } else {
      alert('User not found. Please register.');
    }
  }

  // 🆕 REGISTER
  register() {
    if (!this.username || !this.password) {
      alert('Enter username & password');
      return;
    }

    const exists = this.users.find(u => u.username === this.username);

    if (exists) {
      alert('User already exists');
      return;
    }

    this.users.push({
      username: this.username,
      password: this.password
    });

    this.saveUsers();

    alert('Registered successfully! Now login.');

    this.username = '';
    this.password = '';
  }
}