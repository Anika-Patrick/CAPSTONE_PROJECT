import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {

  calories = 0;
  tokens = 0;
  goal = 500;

  history: number[] = [];

  streak = 0;
  rank = '';
  totalWorkouts = 0;

  weeklyCalories = [0, 0, 0, 0, 0, 0, 0];

  addWorkout(calories: number, tokens: number) {

    this.calories += calories;

    this.tokens += tokens;

    this.totalWorkouts++;

    const day = new Date().getDay();

    this.weeklyCalories[day] += calories;

    this.history.push(calories);
  }
}