import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { FitnessService } from '../services/fitness';
import { ApiService } from '../services/api.service';

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

  username = '';

  currentUsername = '';

  showStreakPopup = false;

  streakMessage = '';

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
    private api: ApiService
  ) {}

  ngOnInit() {

    // LOAD PROFILE
    this.fitness.loadProfile();

    // LOAD HISTORY
    this.fitness.loadHistory();

    this.history = this.fitness.history;

    // LOAD USERNAME
    const storedUser = localStorage.getItem('current_user');
    
    const savedWeeklyCalories =
  localStorage.getItem(
    `weeklyCalories_${this.currentUsername}`
  );

if (savedWeeklyCalories) {

  this.fitness.weeklyCalories =
    JSON.parse(savedWeeklyCalories);
}

if (storedUser) {

  try {

    const parsedUser = JSON.parse(storedUser);

console.log(parsedUser);

this.username =

  parsedUser.username ||

  parsedUser.name ||

  parsedUser.email ||

  'User';

  } catch {

    this.username = storedUser;
  }

} else {

  this.username = 'User';
}
this.currentUsername = this.username;

    // CHECK LOGIN STREAK
    this.handleDailyLogin();

    // UPDATE RANK
    this.updateRank();

    this.updateWeeklyGraph();

    // START QUOTES
    this.startQuotes();
  }

  ngOnDestroy() {

    clearInterval(this.quoteInterval);
  }

  // 🔥 DAILY LOGIN STREAK
  handleDailyLogin() {

    const today = new Date().toDateString();

    const lastLogin =
      localStorage.getItem(
  `last_login_date_${this.currentUsername}`
);

    let streak =
      Number(localStorage.getItem(
  `streak_${this.currentUsername}`
)) || 0;

    // NEW DAY LOGIN
    if (lastLogin !== today) {

      streak++;

      localStorage.setItem(
  `weeklyCalories_${this.currentUsername}`,
  JSON.stringify(this.fitness.weeklyCalories)
);

      localStorage.setItem(
  `last_login_date_${this.currentUsername}`,
  today
);

      this.fitness.streak = streak;

      // UPDATE TODAY CALORIES IN WEEKLY GRAPH

const todayIndex = new Date().getDay();

// JS starts from Sunday = 0
// Your graph is S M T W T F S

this.fitness.weeklyCalories[todayIndex] =
  this.fitness.calories;

// SAVE
localStorage.setItem(
  'weeklyCalories',
  JSON.stringify(this.fitness.weeklyCalories)
);

      // POPUP MESSAGE
      this.streakMessage =
  `🔥 Day ${streak} Streak — Keep pushing!`;

setTimeout(() => {

  this.showStreakPopup = true;

}, 300);
    } else {

      this.fitness.streak = streak;
    }
  }

  updateWeeklyGraph() {

  const todayIndex = new Date().getDay();

  this.fitness.weeklyCalories[todayIndex] =
    this.fitness.calories;

  localStorage.setItem(

    `weeklyCalories_${this.currentUsername}`,

    JSON.stringify(
      this.fitness.weeklyCalories
    )
  );
}
  // 🏆 UPDATE RANK
  updateRank() {

    const streak = this.fitness.streak;

    if (streak >= 30) {

      this.fitness.rank = 'Legend 👑';

    } else if (streak >= 21) {

      this.fitness.rank = 'Elite Warrior ⚔️';

    } else if (streak >= 14) {

      this.fitness.rank = 'Champion 🏆';

    } else if (streak >= 7) {

      this.fitness.rank = 'Warrior ⚡';

    } else if (streak >= 3) {

      this.fitness.rank = 'Rookie 🔥';

    } else {

      this.fitness.rank = 'Beginner 🌱';
    }
  }

  // 📊 GOAL PROGRESS
  get progress() {

    if (this.fitness.goal === 0) return 0;

    return Math.min(
      (this.fitness.calories / this.fitness.goal) * 100,
      100
    );
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

  // 📏 BMI STATUS
  get bmiStatus() {

    if (this.bmi === '--') return 'No Data';

    const bmi = Number(this.bmi);

    if (bmi < 18.5) return 'Underweight ⚠️';

    if (bmi < 25) return 'Healthy ✅';

    if (bmi < 30) return 'Overweight ⚡';

    return 'Obese 🚨';
  }

  // 💬 CHAT ACCESS
  openChat() {

    if (this.fitness.useChat()) {

      this.router.navigate(['/chat']);

    } else {

      this.showToast(
        '⚠️ Need 50 tokens to unlock admin chat'
      );
    }
  }

  // 🗑 RESET
  resetAll() {

    localStorage.clear();

    location.reload();
  }

  // 🔥 RANDOM QUOTES
  startQuotes() {

    this.quoteInterval = setInterval(() => {

      const randomQuote =
        this.quotes[
          Math.floor(Math.random() * this.quotes.length)
        ];

      this.showToast(randomQuote);

    }, 15000);
  }

  // ☁ SAVE DATA
  saveData() {

    const userData = {

      calories: this.fitness.calories,

      tokens: this.fitness.tokens,

      weight: this.fitness.profile?.weight,

      height: this.fitness.profile?.height,

      streak: this.fitness.streak,

      rank: this.fitness.rank
    };

    this.api.saveUser(userData).subscribe({

      next: (res: any) => {

        console.log('Saved', res);

        alert('🔥 Data Saved Successfully');
      },

      error: (err: any) => {

        console.log(err);

        alert('❌ Error saving data');
      }
    });
  }
  closePopup() {

  this.showStreakPopup = false;
}
  // 🔔 TOAST
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