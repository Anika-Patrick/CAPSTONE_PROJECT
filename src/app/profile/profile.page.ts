import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FitnessService } from '../services/fitness';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  currentUser: any = null;
  allUsers: any[] = [];

  constructor(
    private router: Router,
    public fitness: FitnessService
  ) {}

  ngOnInit() {
    this.loadProfile();
    this.fitness.loadCurrentUserData();
  }

  // ================= LOAD PROFILE =================
  loadProfile() {

    // 🔥 FIX: always parse JSON safely
    const profile = localStorage.getItem('current_profile');
    this.currentUser = profile ? JSON.parse(profile) : null;

    const users = localStorage.getItem('fitness_users');
    this.allUsers = users ? JSON.parse(users) : [];
  }

  // ================= LOGOUT =================
  logout() {
    localStorage.removeItem('current_user');
    localStorage.removeItem('current_profile');
    this.router.navigate(['/home']);
  }
}