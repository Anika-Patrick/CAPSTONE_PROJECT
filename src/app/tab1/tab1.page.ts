import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FitnessService } from '../services/fitness';






@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  history: number[] = [];

  quoteInterval: any;

  quotes = [
    '🔥 Push harder than yesterday',
    '💪 No excuses, just results',
    '⚡ Stay consistent',
    '🏆 Earn your body',
    '🚀 Progress over perfection'
  ];

  constructor(
    public fitness: FitnessService,
    private toast: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.fitness.loadProfile();
    this.fitness.loadHistory();

    this.history = this.fitness.history;

    this.startQuotes();
  }

  ngOnDestroy() {
    clearInterval(this.quoteInterval);
  }

  // 📊 Progress %
  get progress() {
    if (this.fitness.goal === 0) return 0;
    return (this.fitness.calories / this.fitness.goal) * 100;
  }

  // 📏 BMI
  get bmi() {
    const weight = this.fitness.profile?.weight || 0;
    const height = this.fitness.profile?.height || 0;

    if (!weight || !height) return '--';

    const h = height / 100;
    const bmiValue = weight / (h * h);

    return bmiValue.toFixed(1);
  }

  // 🏆 BMI Status
  get bmiStatus() {
    if (this.bmi === '--') return 'No Data';

    const bmi = Number(this.bmi);

    if (bmi < 18.5) return 'Underweight ⚠️';
    if (bmi < 25) return 'Healthy ✅';
    if (bmi < 30) return 'Overweight ⚡';

    return 'Obese 🚨';
  }

  // 💬 Floating Chat Button
  openChat() {
    if (this.fitness.useChat()) {
      this.router.navigate(['/chat']);
    } else {
      this.showToast(
        '⚠️ Need 50 tokens to unlock admin chat'
      );
    }
  }

  // 🧹 Reset All
  resetAll() {
    this.fitness.resetAll();
    location.reload();
  }

  // 🔥 Auto motivational quotes
  startQuotes() {
    this.quoteInterval = setInterval(() => {
      const randomQuote =
        this.quotes[
          Math.floor(Math.random() * this.quotes.length)
        ];

      this.showToast(randomQuote);
    }, 10000);
  }

  async showToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 2500,
      position: 'top',
      color: 'primary'
    });

    await toast.present();
  }
}