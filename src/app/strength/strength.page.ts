import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-strength',
  templateUrl: './strength.page.html',
  styleUrls: ['./strength.page.scss'],
  standalone: true,

  imports: [
    IonicModule,
    RouterModule,
    CommonModule
  ]
})

export class StrengthPage implements OnInit {

  // LIVE STATS
  calories = 420;

  sets = 12;

  duration = 45;

  powerLevel = 65;

  challengeProgress = 20;

  statsInterval: any;

  constructor(
    private toastController: ToastController
  ) { }

  ngOnInit() {

    // LIVE AUTO UPDATING STATS
    this.statsInterval = setInterval(() => {

      // Calories increase
      this.calories += Math.floor(Math.random() * 10);

      // Sets increase
      this.sets += Math.floor(Math.random() * 2);

      // Duration increase
      this.duration += 1;

      // Power Level increase
      this.powerLevel += Math.floor(Math.random() * 5);

      // MAX LIMIT
      if (this.powerLevel > 100) {
        this.powerLevel = 100;
      }

      // AUTO DECREASE FOR REALISTIC EFFECT
      this.powerLevel -= Math.floor(Math.random() * 3);

      // MIN LIMIT
      if (this.powerLevel < 40) {
        this.powerLevel = 40;
      }

    }, 3000);
  }

  // BOOST POWER BUTTON
  async boostPower() {

    this.powerLevel += 10;

    if (this.powerLevel > 100) {
      this.powerLevel = 100;
    }

    const toast = await this.toastController.create({

      message: '⚡ Power Boost Activated!',

      duration: 2000,

      color: 'warning',

      position: 'top'
    });

    await toast.present();
  }

  // CHALLENGE BUTTON
  async increaseChallenge() {

    // INCREASE CHALLENGE
    this.challengeProgress += 10;

    // UPDATE LIVE STATS
    this.calories += 20;

    this.sets += 1;

    this.powerLevel += 5;

    // LIMIT CHALLENGE
    if (this.challengeProgress > 100) {
      this.challengeProgress = 100;
    }

    // LIMIT POWER
    if (this.powerLevel > 100) {
      this.powerLevel = 100;
    }

    // DEFAULT TOAST
    let message = 'Challenge Updated 🔥';

    let color = 'success';

    // BRONZE ACHIEVEMENT
    if (
      this.challengeProgress >= 50 &&
      this.challengeProgress < 100
    ) {

      message = '🥉 Bronze Medal Activated!';

      color = 'warning';
    }

    // GOLD ACHIEVEMENT
    if (this.challengeProgress >= 100) {

      message = '🏆 Champion Medal Activated!';

      color = 'danger';
    }

    // POPUP TOAST
    const toast = await this.toastController.create({

      message: message,

      duration: 2500,

      position: 'middle',

      color: color,

      cssClass: 'achievement-toast'
    });

    await toast.present();
  }

  // CLEAR INTERVAL
  ionViewWillLeave() {

    clearInterval(this.statsInterval);
  }

}