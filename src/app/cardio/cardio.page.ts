import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cardio',
  templateUrl: './cardio.page.html',
  styleUrls: ['./cardio.page.scss'],
  standalone: true,

  imports: [
    IonicModule,
    RouterModule,
    CommonModule
  ]
})

export class CardioPage implements OnInit {

  currentWorkout = '';

  // AUDIO PLAYER
  currentAudio = new Audio();

  // LIVE STATS
  calories = 450;

  duration = 32;

  bpm = 128;

  statsInterval: any;

  constructor(
    private toastController: ToastController
  ) { }

  ngOnInit() {

    // AUTO UPDATE STATS
    this.statsInterval = setInterval(() => {

      this.calories += Math.floor(Math.random() * 5);

      this.duration += 1;

      this.bpm = 120 + Math.floor(Math.random() * 20);

    }, 3000);
  }

  // START WORKOUT BUTTON
  async startWorkout() {

    const toast = await this.toastController.create({
      message: 'Workout Session Started 💪',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();
  }

  // PLAY WORKOUT MUSIC
  async playWorkout(workout: string) {

    this.currentWorkout = workout;

    // STOP PREVIOUS SONG
    this.currentAudio.pause();

    this.currentAudio.currentTime = 0;

    // SONG LINKS
    const songs: any = {

      'HIIT Blast':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',

      'Treadmill Run':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',

      'Jump Rope':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    };

    // PLAY NEW SONG
    this.currentAudio.src = songs[workout];

    this.currentAudio.load();

    this.currentAudio.play();

    // TOAST
    const toast = await this.toastController.create({
      message: `${workout} Started 🔥`,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });

    await toast.present();
  }

  // STOP AUDIO + INTERVAL
  ionViewWillLeave() {

    this.currentAudio.pause();

    this.currentAudio.currentTime = 0;

    clearInterval(this.statsInterval);
  }

}