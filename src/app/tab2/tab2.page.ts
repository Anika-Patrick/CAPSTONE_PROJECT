import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page {

  // =========================
  // STATE
  // =========================
  selectedCategory: string = 'Chest';
  isWorkoutMode = false;

  currentExerciseIndex = 0;
  timeLeft = 30;
  reps = 10;

  workoutTimer: any;

  // =========================
  // CATEGORIES
  // =========================
  categories = [
    { name: 'Chest', emoji: '💪', level: 'Beginner' },
    { name: 'Legs', emoji: '🦵', level: 'Advanced' },
    { name: 'Arms', emoji: '🏋️', level: 'Moderate' },
    { name: 'Shoulders', emoji: '🔥', level: 'Moderate' },
    { name: 'Abs', emoji: '⚡', level: 'Beginner' }
  ];

  // =========================
  // WORKOUT DATA
  // =========================
  workoutExercises: any = {
    Chest: [
      { name: 'Push Ups', reps: 12, time: 30 },
      { name: 'Bench Press', reps: 10, time: 30 }
    ],
    Legs: [
      { name: 'Squats', reps: 15, time: 30 },
      { name: 'Lunges', reps: 12, time: 30 }
    ],
    Arms: [
      { name: 'Bicep Curls', reps: 12, time: 30 }
    ],
    Shoulders: [
      { name: 'Shoulder Press', reps: 10, time: 30 }
    ],
    Abs: [
      { name: 'Crunches', reps: 20, time: 30 }
    ]
  };

  // =========================
  // SELECT CATEGORY
  // =========================
  openCategory(category: string) {
    this.selectedCategory = category;
  }

  // =========================
  // START WORKOUT (FIXED)
  // =========================
  startWorkout(category: string) {

    const list = this.workoutExercises?.[category];

    if (!list || list.length === 0) {
      console.warn('No workout found for', category);
      return;
    }

    this.selectedCategory = category;
    this.isWorkoutMode = true;
    this.currentExerciseIndex = 0;

    this.reps = list[0].reps;
    this.timeLeft = list[0].time;

    clearInterval(this.workoutTimer);
    this.runTimer();

    console.log('Workout started:', category);
  }

  // =========================
  // TIMER
  // =========================
  runTimer() {
    clearInterval(this.workoutTimer);

    this.workoutTimer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.nextExercise();
      }
    }, 1000);
  }

  // =========================
  // NEXT / PREV
  // =========================
  nextExercise() {
    const list = this.workoutExercises[this.selectedCategory];

    if (!list) return;

    if (this.currentExerciseIndex < list.length - 1) {
      this.currentExerciseIndex++;
    } else {
      this.exitWorkout();
      return;
    }

    this.resetTimer();
  }

  prevExercise() {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex--;
      this.resetTimer();
    }
  }

  resetTimer() {
    const list = this.workoutExercises[this.selectedCategory];

    if (!list) return;

    const exercise = list[this.currentExerciseIndex];

    this.reps = exercise.reps;
    this.timeLeft = exercise.time;

    this.runTimer();
  }

  // =========================
  // EXIT WORKOUT
  // =========================
  exitWorkout() {
    this.isWorkoutMode = false;
    clearInterval(this.workoutTimer);
  }

  // =========================
  // CLEAR DATA
  // =========================
  clearWorkouts() {
    alert('Workout data cleared!');
  }
}