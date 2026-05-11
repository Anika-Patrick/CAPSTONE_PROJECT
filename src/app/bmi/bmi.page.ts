import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FitnessService } from '../services/fitness';

@Component({
  selector: 'app-bmi',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './bmi.page.html',
  styleUrls: ['./bmi.page.scss']
})
export class BmiPage {

  // 👤 USER INPUTS
  weight = 60;
  height = 170;
  goalType = 'fat';
  goalCalories = 500;

  constructor(
    private router: Router,
    public fitness: FitnessService
  ) {}

  // 📏 BMI VALUE
  get bmi() {
    const heightInMeters = this.height / 100;

    if (!this.weight || !this.height) {
      return 0;
    }

    const bmiValue =
      this.weight / (heightInMeters * heightInMeters);

    return bmiValue.toFixed(1);
  }

  // 🏆 BMI STATUS
  get bmiStatus() {
    const bmiValue = Number(this.bmi);

    if (bmiValue < 18.5) {
      return 'Underweight ⚠️';
    }

    if (bmiValue >= 18.5 && bmiValue < 25) {
      return 'Healthy ✅';
    }

    if (bmiValue >= 25 && bmiValue < 30) {
      return 'Overweight ⚡';
    }

    return 'Obese 🚨';
  }

  // 🚀 SAVE + OPEN TAB 1
  savePlan() {
    const result = this.fitness.calculatePlan(
  this.weight,
  this.height
);

    this.fitness.setProfile({
      weight: this.weight,
      height: this.height,
      goalType: this.goalType,
      goalCalories: this.goalCalories,
      days: result.days,
      level: result.level
    });
    {
  console.log('Navigating to tab1');

  this.router.navigate(['/tabs/tab1']).then(success => {
    console.log('Navigation success:', success);
  }).catch(err => {
    console.error('Navigation error:', err);
  });
}

    this.fitness.setGoal(this.goalCalories);

    // open tabs after BMI
    this.router.navigate(['tabs','tab1']);
  }
}