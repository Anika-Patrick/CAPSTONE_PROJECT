import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FitnessService {

  // USER PROFILE
  profile: any = {
    name: '',
    age: '',
    gender: '',
    weight: 0,
    height: 0
  };

  // FITNESS STATS
  calories = 0;

  tokens = 0;

  goal = 500;

  history: number[] = [];

  workouts: any[] = [];

  // NEW FEATURES
  streak = 0;

  totalWorkouts = 0;

  rank = '';

  weeklyCalories = [0, 0, 0, 0, 0, 0, 0];

  lastLoginDate = '';

  activeDays = 0;

  constructor() {

    this.loadProfile();

    this.loadHistory();

    this.loadWorkouts();

    this.loadExtraData();
  }

  // =========================
  // PROFILE
  // =========================

  private getCurrentUsername(): string | null {
    const current = localStorage.getItem('current_user');
    if (!current) {
      return null;
    }

    try {
      const user = JSON.parse(current);
      return user?.username || null;
    } catch {
      return null;
    }
  }

  private getStorageKey(base: string) {
    const username = this.getCurrentUsername();
    return username ? `${username}_${base}` : base;
  }

  loadCurrentUserData() {
    this.loadProfile();
    this.loadHistory();
    this.loadWorkouts();
    this.loadExtraData();
  }

  saveProfile(data: any) {

    this.profile = data;

    localStorage.setItem(
      this.getStorageKey('fitness_profile'),
      JSON.stringify(data)
    );
  }

  loadProfile() {

    const data = localStorage.getItem(
      this.getStorageKey('fitness_profile')
    );

    if (data) {

      this.profile = JSON.parse(data);
    }
  }

  // =========================
  // CALORIES + TOKENS
  // =========================

  addWorkout(calories: number, tokens: number) {

    this.calories += calories;

    this.tokens += tokens;

    this.totalWorkouts++;

    // ADD TO GRAPH
    const day = new Date().getDay();

    this.weeklyCalories[day] += calories;

    this.history.push(calories);

    this.saveHistory();

    this.saveExtraData();
  }

  updateStreakOnLogin() {
    const username = this.getCurrentUsername();
    if (!username) {
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    if (!this.lastLoginDate) {
      this.streak = 1;
      this.activeDays = 1;
    } else if (this.lastLoginDate === today) {
      // already updated today
    } else {
      const lastDate = new Date(this.lastLoginDate);
      const diffDays = Math.round(
        (new Date(today).getTime() - lastDate.getTime()) /
          86400000
      );

      if (diffDays === 1) {
        this.streak += 1;
        this.activeDays += 1;
      } else {
        this.streak = 1;
        this.activeDays += 1;
      }
    }

    this.lastLoginDate = today;
    this.saveExtraData();
  }

  // =========================
  // HISTORY
  // =========================

  saveHistory() {

    localStorage.setItem(
      this.getStorageKey('fitness_history'),
      JSON.stringify(this.history)
    );
  }

  loadHistory() {

    const data = localStorage.getItem(
      this.getStorageKey('fitness_history')
    );

    if (data) {

      this.history = JSON.parse(data);
    }
  }

  // =========================
  // WORKOUTS
  // =========================

  saveWorkouts() {

    localStorage.setItem(
      this.getStorageKey('fitness_workouts'),
      JSON.stringify(this.workouts)
    );
  }

  loadWorkouts() {

    const data = localStorage.getItem(
      this.getStorageKey('fitness_workouts')
    );

    if (data) {

      this.workouts = JSON.parse(data);
    }
  }

  // =========================
  // EXTRA FITNESS DATA
  // =========================

  saveExtraData() {

    localStorage.setItem(
      this.getStorageKey('fitness_extra'),
      JSON.stringify({

        calories: this.calories,

        tokens: this.tokens,

        streak: this.streak,

        totalWorkouts: this.totalWorkouts,

        rank: this.rank,

        weeklyCalories: this.weeklyCalories,

        lastLoginDate: this.lastLoginDate,

        activeDays: this.activeDays
      })
    );
  }

  loadExtraData() {

    const data = localStorage.getItem(
      this.getStorageKey('fitness_extra')
    );

    if (data) {

      const parsed = JSON.parse(data);

      this.calories = parsed.calories || 0;

      this.tokens = parsed.tokens || 0;

      this.streak = parsed.streak || 0;

      this.totalWorkouts =
        parsed.totalWorkouts || 0;

      this.rank = parsed.rank || '';

      this.weeklyCalories =
        parsed.weeklyCalories ||
        [0, 0, 0, 0, 0, 0, 0];

      this.lastLoginDate =
        parsed.lastLoginDate || '';

      this.activeDays = parsed.activeDays || 0;
    }
  }

  // =========================
  // CHAT LOCK
  // =========================
    // =========================
  // BMI PLAN CALCULATOR
  // =========================

  // =========================
// BMI PLAN CALCULATOR
// =========================

calculatePlan(
   weight: number,
  height: number,
  goal?: string,
  age?: number,
  gender?: string
) {

  const h = height / 100;

  const bmi = weight / (h * h);

  let bmiStatus = '';

  if (bmi < 18.5) {

    bmiStatus = 'Underweight';

  } else if (bmi < 25) {

    bmiStatus = 'Healthy';

  } else if (bmi < 30) {

    bmiStatus = 'Overweight';

  } else {

    bmiStatus = 'Obese';
  }

  // DEFAULTS

  let calories = 2000;

  let days = 90;

  let level = 'Beginner';

  if (goal === 'Weight Loss') {

    calories = 1500;

    days = 120;

    level = 'Fat Burn';

  } else if (goal === 'Muscle Gain') {

    calories = 2500;

    days = 150;

    level = 'Muscle Builder';

  }

  return {

    bmi: bmi.toFixed(1),

    bmiStatus,

    calories,

    days,

    level
  };
}

  // =========================
  // SET PROFILE
  // =========================

  setProfile(data: any) {

    this.profile = data;

    this.saveProfile(data);
  }

  // =========================
  // SET GOAL
  // =========================

  setGoal(goalCalories: number) {

    this.goal = goalCalories;

    this.saveExtraData();
  }

  // =========================
  // SAVE STATS
  // =========================

  saveStats() {

    this.saveExtraData();

    this.saveHistory();

    this.saveWorkouts();
  }
  useChat(): boolean {

    if (this.tokens >= 50) {

      this.tokens -= 50;

      this.saveExtraData();

      return true;
    }

    return false;
  }

  // =========================
  // RESET
  // =========================

  resetAll() {
    const username = this.getCurrentUsername();
    if (username) {
      localStorage.removeItem(
        `${username}_fitness_profile`
      );
      localStorage.removeItem(
        `${username}_fitness_history`
      );
      localStorage.removeItem(
        `${username}_fitness_extra`
      );
      localStorage.removeItem(
        `${username}_fitness_workouts`
      );
    } else {
      localStorage.clear();
    }

    this.calories = 0;

    this.tokens = 0;

    this.goal = 500;

    this.history = [];

    this.workouts = [];

    this.streak = 0;

    this.totalWorkouts = 0;

    this.rank = '';

    this.weeklyCalories =
      [0, 0, 0, 0, 0, 0, 0];

    this.lastLoginDate = '';

    this.activeDays = 0;
  }
}