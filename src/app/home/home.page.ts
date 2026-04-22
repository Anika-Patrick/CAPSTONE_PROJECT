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

  // 📥 Load users from localStorage
  loadUsers() {
    const data = localStorage.getItem('fitness_users');
    this.users = data ? JSON.parse(data) : [];
  }

  // 💾 Save users to localStorage
  saveUsers() {
    localStorage.setItem(
      'fitness_users',
      JSON.stringify(this.users)
    );
  }

  // 🔐 LOGIN
  login() {

    // ✅ Admin Login
    if (
      this.username === 'admin' &&
      this.password === '5678'
    ) {
      this.router.navigate(['/admin']);
      return;
    }

    // ✅ Default User Login
    if (
      this.username === 'user' &&
      this.password === '1234'
    ) {
      // 🔥 Go to BMI first
      this.router.navigateByUrl('/bmi');
      return;
    }

    // ✅ Registered Users Login
    const user = this.users.find(
      u =>
        u.username === this.username &&
        u.password === this.password
    );

    if (user) {
      // 🔥 Go to BMI first
      this.router.navigateByUrl('/bmi');
    } else {
      alert(
        'User not found. Please register first.'
      );
    }
  }

  // 🆕 REGISTER
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

    this.users.push({
      username: this.username,
      password: this.password
    });

    this.saveUsers();

    alert(
      'Registered successfully! Now login.'
    );

    // Clear fields
    this.username = '';
    this.password = '';
  }
}