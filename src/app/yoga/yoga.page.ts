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

  // LIVE STATS
  calories = 180;

  sets = 8;

  duration = 30;

  powerLevel = 75;

  challengeProgress = 20;

  statsInterval: any;

  constructor(
    private toastController: ToastController
  ) {}

  ngOnInit() {

    // AUTO LIVE UPDATES
    this.statsInterval = setInterval(() => {

      this.calories += 3;

      this.duration += 1;

      this.powerLevel -= 1;

      if (this.powerLevel < 40) {
        this.powerLevel = 40;
      }

    }, 3000);
  }

  // BOOST ENERGY
  async boostPower() {

    this.powerLevel += 10;

    if (this.powerLevel > 100) {
      this.powerLevel = 100;
    }

    const toast = await this.toastController.create({

      message: '🧘 Energy Boost Activated!',

      duration: 2000,

      color: 'success',

      position: 'top'
    });

    await toast.present();
  }

  // CHALLENGE BUTTON
  async increaseChallenge() {

    this.challengeProgress += 10;

    this.calories += 15;

    this.sets += 1;

    if (this.challengeProgress > 100) {
      this.challengeProgress = 100;
    }

    let message = '🔥 Yoga Challenge Updated';

    if (this.challengeProgress >= 100) {
      message = '🏆 Yoga Master Achieved!';
    }

    const toast = await this.toastController.create({

      message: message,

      duration: 2500,

      color: 'warning',

      position: 'middle'
    });

    await toast.present();
  }

  ionViewWillLeave() {
    clearInterval(this.statsInterval);
  }

}