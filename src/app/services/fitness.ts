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

  constructor() {

    this.loadProfile();

    this.loadHistory();

    this.loadWorkouts();

    this.loadExtraData();
  }

  // =========================
  // PROFILE
  // =========================

  saveProfile(data: any) {

    this.profile = data;

    localStorage.setItem(
      'fitness_profile',
      JSON.stringify(data)
    );
  }

  loadProfile() {

    const data = localStorage.getItem('fitness_profile');

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

  // =========================
  // HISTORY
  // =========================

  saveHistory() {

    localStorage.setItem(
      'fitness_history',
      JSON.stringify(this.history)
    );
  }

  loadHistory() {

    const data = localStorage.getItem(
      'fitness_history'
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
      'fitness_workouts',
      JSON.stringify(this.workouts)
    );
  }

  loadWorkouts() {

    const data = localStorage.getItem(
      'fitness_workouts'
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
      'fitness_extra',
      JSON.stringify({

        calories: this.calories,

        tokens: this.tokens,

        streak: this.streak,

        totalWorkouts: this.totalWorkouts,

        rank: this.rank,

        weeklyCalories: this.weeklyCalories,

        lastLoginDate: this.lastLoginDate
      })
    );
  }

  loadExtraData() {

    const data = localStorage.getItem(
      'fitness_extra'
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

    localStorage.clear();

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
  }
}