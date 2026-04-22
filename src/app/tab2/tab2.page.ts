import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page {

  constructor(private router: Router) {}

  // ✅ SELECTED CATEGORY FOR CLICKABLE CAROUSEL
  selectedCategory = 'Chest';

  // 💪 WORKOUT CATEGORIES
  categories = [
    {
      name: 'Chest',
      emoji: '💪',
      level: 'Beginner',
      desc: 'Build upper body strength'
    },
    {
      name: 'Legs',
      emoji: '🦵',
      level: 'Advanced',
      desc: 'Powerful lower body training'
    },
    {
      name: 'Arms',
      emoji: '🏋️',
      level: 'Moderate',
      desc: 'Biceps & triceps focus'
    },
    {
      name: 'Shoulders',
      emoji: '🔥',
      level: 'Moderate',
      desc: 'Strong shoulder definition'
    },
    {
      name: 'Abs',
      emoji: '⚡',
      level: 'Beginner',
      desc: 'Core strength & stability'
    }
  ];

  // 🚀 OPEN EXERCISE PAGE
  openCategory(category: string) {
    console.log('Opening:', category);

    // also update active selected chip
    this.selectedCategory = category;

    this.router.navigate([
      '/exercise',
      category
    ]);
  }

  // 🧹 CLEAR ONLY TAB 2 DATA
  clearWorkouts() {
    localStorage.removeItem('fitness_workouts');

    alert(
      '🧹 Workout data cleared successfully!'
    );
  }
}