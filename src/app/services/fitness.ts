import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {

  calories = 0;
  tokens = 0;
  goal = 500;

  workouts: any[] = [];
  profile: any = null;

  // 📊 GRAPH HISTORY (7 DAYS)
  history: number[] = [];

  constructor() {
    this.loadStats();
    this.loadWorkouts();
    this.loadProfile();
    this.loadHistory();
  }

  // =======================
  // 📊 STATS
  // =======================
  loadStats() {
    this.calories = Number(localStorage.getItem('calories') || 0);
    this.tokens = Number(localStorage.getItem('tokens') || 0);
    this.goal = Number(localStorage.getItem('goal') || 500);
  }

  saveStats() {
    localStorage.setItem('calories', this.calories.toString());
    localStorage.setItem('tokens', this.tokens.toString());
    localStorage.setItem('goal', this.goal.toString());
  }

  // =======================
  // 🏋️ WORKOUTS
  // =======================
  loadWorkouts() {
    const data = localStorage.getItem('workouts');
    this.workouts = data ? JSON.parse(data) : [];
  }

  saveWorkouts() {
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  // =======================
  // 👤 PROFILE
  // =======================
  loadProfile() {
    const data = localStorage.getItem('fitness_profile');
    this.profile = data ? JSON.parse(data) : null;
  }

  saveProfile() {
    localStorage.setItem(
      'fitness_profile',
      JSON.stringify(this.profile)
    );
  }

  setProfile(data: any) {
    this.profile = data;
    this.saveProfile();
  }

  // =======================
  // 🧠 FITNESS PLAN LOGIC
  // =======================
  calculatePlan(weight: number, goalType: string) {
    let days =
      goalType === 'fat'
        ? Math.round(weight * 2)
        : Math.round(weight * 1.5);

    let level =
      weight < 60
        ? 'Beginner'
        : weight < 80
        ? 'Moderate'
        : 'Advanced';

    return {
      days,
      level
    };
  }

  // =======================
  // 📊 GRAPH HISTORY
  // =======================
  loadHistory() {
    const data = localStorage.getItem('history');

    this.history = data
      ? JSON.parse(data)
      : [0, 0, 0, 0, 0, 0, 0];
  }

  saveHistory() {
    localStorage.setItem(
      'history',
      JSON.stringify(this.history)
    );
  }

  // =======================
  // 🎯 SET GOAL
  // =======================
  setGoal(val: number) {
    this.goal = val;
    this.saveStats();
  }

  // =======================
  // 📏 BMI LOGIC
  // =======================
  getBMI(weight: number, height: number) {
    if (!weight || !height) return 0;

    const heightInMeters = height / 100;

    const bmi =
      weight / (heightInMeters * heightInMeters);

    return Number(bmi.toFixed(1));
  }

  getBMIStatus(bmi: number) {
    if (bmi < 18.5) {
      return 'Underweight ⚠️';
    }

    if (bmi >= 18.5 && bmi < 25) {
      return 'Healthy ✅';
    }

    if (bmi >= 25 && bmi < 30) {
      return 'Overweight ⚡';
    }

    return 'Obese 🚨';
  }

  // =======================
  // ✅ COMPLETE WORKOUT
  // =======================
  completeWorkout(workout: any) {
    if (!workout.completed) {
      workout.completed = true;

      // calories update
      this.calories += workout.calories;

      // token reward
      this.tokens += 1;

      // 📊 Graph update for today
      const today = new Date().getDay(); // 0–6
      this.history[today] += workout.calories;

      // save everything
      this.saveHistory();
      this.saveWorkouts();
      this.saveStats();
    }
  }

  // =======================
  // 💬 ADMIN CHAT ACCESS
  // =======================
  useChat() {
    if (this.tokens >= 50) {
      this.tokens -= 50;
      this.saveStats();
      return true;
    }

    return false;
  }

  // =======================
  // 🧹 RESET EVERYTHING
  // =======================
  resetAll() {
    this.calories = 0;
    this.tokens = 0;
    this.goal = 500;

    this.workouts = [];
    this.profile = null;

    this.history = [0, 0, 0, 0, 0, 0, 0];

    localStorage.clear();
  }
}