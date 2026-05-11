import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage {

  username = '';
  password = '';

  constructor(private router: Router) {}

  ionViewWillEnter() {
  window.scrollTo(0, 0);
}
  signup() {

    console.log('Signup clicked');

    if (!this.username || !this.password) {
      alert('Fill all fields');
      return;
    }

    let users = JSON.parse(localStorage.getItem('fitness_users') || '[]');

    const exists = users.find((u: any) => u.username === this.username);

    if (exists) {
      alert('User already exists');
      return;
    }

    users.push({
      username: this.username,
      password: this.password,
      // FITNESS DATA
  caloriesBurned: 0,

  tokens: 0,

  streak: 0,

  totalWorkouts: 0,

  lastLoginDate: '',

  rank: '',

  weeklyCalories: [0, 0, 0, 0, 0, 0, 0]

    });

    localStorage.setItem('fitness_users', JSON.stringify(users));

    alert('Registered successfully!');

    // 🔥 SAFE NAVIGATION (same fix style as welcome)
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 100);
  }
  
}