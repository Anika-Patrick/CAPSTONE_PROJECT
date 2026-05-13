import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FitnessService } from '../services/fitness';

// ✅ ADD THIS IMPORT
import { AppHeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    AppHeaderComponent
  ],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  history: number[] = [];

  quoteInterval: any;

  isFirstLoginToday = false;

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
    private router: Router,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.fitness.loadCurrentUserData();
    
    // Check if this is first login of the day
    const today = new Date().toISOString().slice(0, 10);
    const lastLogin = this.fitness.lastLoginDate;
    
    if (lastLogin !== today) {
      this.isFirstLoginToday = true;
    }
    
    this.fitness.updateStreakOnLogin();
    this.history = this.fitness.weeklyCalories;

    // Show streak popup if first login today
    if (this.isFirstLoginToday && this.fitness.streak > 0) {
      setTimeout(() => {
        this.showStreakPopup();
      }, 500);
    }

    this.startQuotes();
  }

  ngOnDestroy() {
    clearInterval(this.quoteInterval);
  }

  // Show Streak Popup
  async showStreakPopup() {
    const alert = await this.alert.create({
      cssClass: 'streak-alert',
      header: '🔥 Daily Streak',
      subHeader: this.fitness.rank,
      message: `${this.fitness.getStreakPopupMessage()}\n\n${this.fitness.getRankDescription()}`,
      buttons: [
        {
          text: 'Keep Going! 💪',
          handler: () => {
            this.showToast('Let\'s crush today\'s goals! 🚀');
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
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

  getBarHeight(item: number) {
    const maxHeight = 160;
    const maxValue = Math.max(...this.history, 100);
    if (maxValue <= 0) {
      return 20;
    }
    const height = Math.round((item / maxValue) * maxHeight);
    return Math.max(12, Math.min(height, maxHeight));
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