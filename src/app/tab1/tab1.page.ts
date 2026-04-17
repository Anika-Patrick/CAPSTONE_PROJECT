import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FitnessService } from '../services/fitness';

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page implements OnInit {

  goalInput = 0;

  constructor(
    public fitness: FitnessService,
    private router: Router
  ) {}

  ngOnInit() {
    // 🔥 Load current goal into input
    this.goalInput = this.fitness.goal;
  }

  // 🎯 SET GOAL
  setGoal() {
    if (!this.goalInput || this.goalInput <= 0) {
      alert('Enter a valid goal');
      return;
    }

    this.fitness.setGoal(this.goalInput);
  }

  // 💬 CHAT ACCESS (FIXED)
  openChat() {
    if (this.fitness.useChat()) {
      this.router.navigate(['/chat']); // ✅ Angular navigation
    } else {
      alert('⚠️ You need 50 tokens to unlock chat');
    }
  }

  // 📊 PROGRESS %
  get progress() {
    if (!this.fitness.goal) return 0;

    const percent = (this.fitness.calories / this.fitness.goal) * 100;

    // ✅ prevent overflow >100%
    return percent > 100 ? 100 : percent;
  }
}