import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

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

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    // 🔥 THIS FIXES SCROLL ISSUE
    window.scrollTo(0, 0);
  }

  setCurrentUser(user: any) {
    this.auth.setCurrentUser(user);
  }

  login() {
    const username = this.username.trim();
    const password = this.password.trim();

    if (!username || !password) {
      alert('Enter credentials');
      return;
    }

    // ADMIN
    if (username.toLowerCase() === 'admin' && password === '5678') {
      const admin = { username: 'admin' };
      this.auth.setCurrentUser(admin);
      this.router.navigate(['/admin']);
      return;
    }

    // DEFAULT USER
    if (username.toLowerCase() === 'user' && password === '1234') {
      const user = { username: 'user' };
      this.auth.setCurrentUser(user);
      this.router.navigateByUrl('/bmi');
      return;
    }

    const user = this.auth.findUser(username, password);

    if (user) {
      this.auth.setCurrentUser(user);
      this.router.navigateByUrl('/bmi');
    } else {
      alert('User not found or password is incorrect. Please register first.');
    }
  }

  goSignup() {
    this.router.navigate(['/signup']);
  }
}
