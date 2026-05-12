import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonicModule,
  ToastController
} from '@ionic/angular';

@Component({
  selector: 'app-yoga',
  templateUrl: './yoga.page.html',
  styleUrls: ['./yoga.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})

export class YogaPage implements OnInit {

  // HERO STATS
  calories = 180;
  sets = 8;
  duration = 30;
  powerLevel = 75;
  challengeProgress = 20;

  statsInterval: any;

  // YOGA
  selectedCategory: string = 'PCOD';
  selectedLevel: string = 'Beginner';

  levels = ['Beginner', 'Moderate', 'Advanced'];

  isYogaMode = false;
  completedAsanas = 0;
totalAsanas = 0;

  currentAsanaIndex = 0;

  timeLeft = 30;

  breaths = 10;

  yogaTimer: any;

  categories = [
    { name: 'PCOD', emoji: '🌸' },
    { name: 'Sleep', emoji: '😴' },
    { name: 'Stress Relief', emoji: '🧘' }
  ];

  categoryGifs: any = {
    PCOD: 'assets/yoga/pcod.gif',
    Sleep: 'assets/yoga/sleep.gif',
    'Stress Relief': 'assets/yoga/stress.gif'
  };

  asanaGifs: any = {
    'Butterfly Pose': 'assets/yoga/butterfly.gif',
    'Cobra Pose': 'assets/yoga/cobra.gif',
    'Child Pose': 'assets/yoga/childpose.gif'
  };

  yogaExercises: any = {

    PCOD: {

      Beginner: [
        {
          name: 'Butterfly Pose',
          breaths: 10,
          time: 30
        },

        {
          name: 'Cobra Pose',
          breaths: 10,
          time: 30
        },

        {
          name: 'Child Pose',
          breaths: 10,
          time: 30
        }
      ]
    },

    Sleep: {

      Beginner: [
        {
          name: 'Butterfly Pose',
          breaths: 10,
          time: 30
        }
      ]
    },

    'Stress Relief': {

      Beginner: [
        {
          name: 'Child Pose',
          breaths: 10,
          time: 30
        }
      ]
    }
  };

  constructor(
    private toastController: ToastController
  ) {}

  ngOnInit() {

    this.statsInterval = setInterval(() => {

      this.calories += 2;

      this.duration += 1;

      if (this.powerLevel > 40) {
        this.powerLevel -= 1;
      }

    }, 3000);
  }

  async boostPower() {

    this.powerLevel += 10;

    if (this.powerLevel > 100) {
      this.powerLevel = 100;
    }

    const toast = await this.toastController.create({

      message: '🧘 Energy Boost Activated!',

      duration: 2000,

      color: 'success'
    });

    await toast.present();
  }

  async increaseChallenge() {

    this.challengeProgress += 10;

    if (this.challengeProgress > 100) {
      this.challengeProgress = 100;
    }

    const toast = await this.toastController.create({

      message: '🔥 Challenge Updated',

      duration: 2000,

      color: 'warning'
    });

    await toast.present();
  }

  changeLevel(level: string) {

    this.selectedLevel = level;
  }

  openCategory(category: string) {

    this.selectedCategory = category;
  }

  startYoga(category: string) {

    this.selectedCategory = category;

    this.isYogaMode = true;

    this.currentAsanaIndex = 0;

    this.loadAsana();
  }

  loadAsana() {

    const asana =
      this.yogaExercises[this.selectedCategory]
      ?.['Beginner']
      ?.[this.currentAsanaIndex];

    if (!asana) return;

    this.timeLeft = asana.time;

    this.breaths = asana.breaths;

    this.runTimer();
  }

  runTimer() {

    clearInterval(this.yogaTimer);

    this.yogaTimer = setInterval(() => {

      if (this.timeLeft > 0) {

        this.timeLeft--;

      } else {

        this.nextAsana();
      }

    }, 1000);
  }

  nextAsana() {

    const list =
      this.yogaExercises[this.selectedCategory]
      ?.['Beginner'];

    if (!list) return;

    if (this.currentAsanaIndex < list.length - 1) {

      this.currentAsanaIndex++;

      this.loadAsana();

    } else {

      this.finishYoga();
    }
  }

  prevAsana() {

    if (this.currentAsanaIndex > 0) {

      this.currentAsanaIndex--;

      this.loadAsana();
    }
  }

  exitYoga() {

    this.isYogaMode = false;

    clearInterval(this.yogaTimer);
  }

  finishYoga() {

    this.isYogaMode = false;

    clearInterval(this.yogaTimer);

    alert('🧘 Yoga Completed!');
  }

  clearYogaData() {

    this.calories = 0;

    this.sets = 0;

    this.duration = 0;

    this.challengeProgress = 0;

    alert('Yoga Data Cleared');
  }

  onGifError(event: any) {

    event.target.src =
      'https://cdn-icons-png.flaticon.com/512/1048/1048941.png';
  }

  ionViewWillLeave() {

    clearInterval(this.statsInterval);

    clearInterval(this.yogaTimer);
  }
}