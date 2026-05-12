import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ionViewWillEnter() {
    window.scrollTo(0, 0);
  }

  signup() {
    const username = this.username.trim();
    const password = this.password.trim();

    if (!username || !password) {
      alert('Fill all fields');
      return;
    }

    const user = this.auth.register(username, password);

    if (!user) {
      alert('User already exists');
      return;
    }

    this.auth.setCurrentUser(user);
    this.username = '';
    this.password = '';

    alert('Registered successfully! You are now logged in.');

    setTimeout(() => {
      this.router.navigateByUrl('/bmi');
    }, 100);
  }
}
