import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-yoga',
  templateUrl: './yoga.page.html',
  styleUrls: ['./yoga.page.scss'],
  standalone: true,

  imports: [
    IonicModule,
    RouterModule,
    CommonModule
  ]
})

export class YogaPage implements OnInit {

  calmLevel = 72;

  focus = 88;

  sessionTime = 20;

  activePose = '';

  currentAffirmation = 0;

  affirmations = [

    'Your mind is stronger than your thoughts.',

    'Breathe in peace, breathe out stress.',

    'Every breath heals your soul.',

    'Calm mind brings inner strength.',

    'You are balanced and powerful.'
  ];

  statsInterval: any;

  constructor(
    private toastController: ToastController
  ) { }

  ngOnInit() {

    // LIVE STATS
    this.statsInterval = setInterval(() => {

      this.calmLevel += Math.floor(Math.random() * 3);

      this.focus += Math.floor(Math.random() * 2);

      this.sessionTime += 1;

      // LIMITS
      if (this.calmLevel > 100) {
        this.calmLevel = 100;
      }

      if (this.focus > 100) {
        this.focus = 100;
      }

    }, 4000);
  }

  // MEDITATION
  async startMeditation() {

    this.calmLevel += 5;

    const toast = await this.toastController.create({

      message: '🧘 Meditation Started',

      duration: 2000,

      color: 'success',

      position: 'bottom'
    });

    await toast.present();
  }

  // AFFIRMATION
  nextAffirmation() {

    this.currentAffirmation++;

    if (this.currentAffirmation >= this.affirmations.length) {

      this.currentAffirmation = 0;
    }
  }

  // YOGA POSE
  async selectPose(pose: string) {

    this.activePose = pose;

    this.focus += 5;

    this.calmLevel += 3;

    const toast = await this.toastController.create({

      message: `${pose} Activated 🌿`,

      duration: 2000,

      color: 'tertiary',

      position: 'top'
    });

    await toast.present();
  }

  // CLEAR INTERVAL
  ionViewWillLeave() {

    clearInterval(this.statsInterval);
  }

}