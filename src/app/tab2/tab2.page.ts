import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page {

  categories = ['Chest', 'Back', 'Legs', 'Arms', 'Abs'];
  selectedCategory = 'Chest';

  streak = 0;

  showModal = false;

  newWorkout = {
    name: '',
    category: '',
    sets: '',
    reps: ''
  };

  workouts = [
    { name: 'Bench Press', category: 'Chest', sets: 3, reps: 12, icon: '🏋️', completed: false },
    { name: 'Push Ups', category: 'Chest', sets: 4, reps: 15, icon: '💪', completed: false },

    { name: 'Deadlift', category: 'Back', sets: 3, reps: 10, icon: '🔥', completed: false },
    { name: 'Pull Ups', category: 'Back', sets: 4, reps: 8, icon: '🏋️', completed: false },

    { name: 'Squats', category: 'Legs', sets: 4, reps: 12, icon: '🦵', completed: false },

    { name: 'Bicep Curl', category: 'Arms', sets: 3, reps: 15, icon: '💥', completed: false },

    { name: 'Crunches', category: 'Abs', sets: 4, reps: 20, icon: '⚡', completed: false }
  ];

  get filteredWorkouts() {
    return this.workouts.filter(
      workout => workout.category === this.selectedCategory
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  markComplete(workout: any) {
    if (!workout.completed) {
      workout.completed = true;
      this.streak++;
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addWorkout() {
    this.workouts.push({
      name: this.newWorkout.name,
      category: this.newWorkout.category,
      sets: Number(this.newWorkout.sets),
      reps: Number(this.newWorkout.reps),
      icon: '🔥',
      completed: false
    });

    this.newWorkout = {
      name: '',
      category: '',
      sets: '',
      reps: ''
    };

    this.closeModal();
  }
}