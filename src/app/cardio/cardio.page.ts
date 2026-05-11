import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cardio',
  templateUrl: './cardio.page.html',
  styleUrls: ['./cardio.page.scss'],
  standalone: true,

  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
    FormsModule
  ]
})

export class CardioPage implements OnInit {

  currentWorkout = '';

  // AUDIO PLAYER
  currentAudio = new Audio();

  // FIXED STATS
  calories = 0;

  duration = 0;

  bpm = 0;

  constructor(
    private toastController: ToastController
  ) { }

  ngOnInit() {

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

  // STOP AUDIO
  ionViewWillLeave() {

    this.currentAudio.pause();

    this.currentAudio.currentTime = 0;
  }

}