import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {

  constructor(private router: Router) {}

  // 📊 Dashboard Data
  streak = 3;

  caloriesConsumed = 1200;
  caloriesGoal = 2000;

  workoutDone = 2;
  workoutTotal = 4;

  mealsDone = 2;
  mealsTotal = 5;

  badges = ['🔥 Consistent', '💪 Beginner'];

  get caloriePercent() {
    return (this.caloriesConsumed / this.caloriesGoal) * 100;
  }

  get workoutPercent() {
    return (this.workoutDone / this.workoutTotal) * 100;
  }

  get mealPercent() {
    return (this.mealsDone / this.mealsTotal) * 100;
  }

  // 💬 Open Chat Page
  openChat() {
    this.router.navigate(['/chat']); // ✅ CORRECT
  }
}