import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FitnessService {

  calories = 0;

tokens = 0;

goal = 500;

history: number[] = [];

// 🏆 NEW VARIABLES
streak = 0;

rank = '';

totalWorkouts = 0;

weeklyCalories = [0, 0, 0, 0, 0, 0, 0];

}