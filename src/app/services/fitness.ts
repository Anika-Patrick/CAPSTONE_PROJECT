import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {

  calories = 0;
  tokens = 0;
  goal = 500;

  constructor() {
    this.loadStats();
  }

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

  setGoal(val: number) {
    this.goal = val;
    this.saveStats();
  }

  useChat() {
    if (this.tokens >= 50) {
      this.tokens -= 50;
      this.saveStats();
      return true;
    }
    return false;
  }
}