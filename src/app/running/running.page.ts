import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-running',
  templateUrl: './running.page.html',
  styleUrls: ['./running.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule]
})
export class RunningPage implements OnInit {

  distance = 0;
  calories = 0;
  pace = 6;
  energy = 100;
  progress = 0;

  status = 'Ready to Run 🏁';
  coachMessage = 'Start your run to get guidance 🧠';

  interval: any;

  constructor(private toastController: ToastController) {}

  ngOnInit() {}

  async startRun() {

    this.status = 'Running... 🏃‍♂️';

    this.interval = setInterval(() => {

      this.distance += 0.08;
      this.calories += 4;
      this.progress += 2;
      this.energy -= 1;

      this.pace =
        this.energy > 70 ? 10 :
        this.energy > 40 ? 7 : 5;

      this.updateCoach();

      if (this.energy <= 0 || this.progress >= 100) {
        clearInterval(this.interval);
        this.finishRun();
      }

    }, 1500);

    this.showToast('🏃 Run Started!');
  }

  boostSpeed() {
    this.pace += 2;
    this.energy -= 5;
    this.showToast('⚡ Speed Boost!');
  }

  updateCoach() {

    if (this.energy > 70) {
      this.coachMessage = '🔥 Strong pace, keep it up!';
    } else if (this.energy > 40) {
      this.coachMessage = '⚠️ Maintain rhythm';
    } else {
      this.coachMessage = '🛑 Slow down, low energy';
    }
  }

  async finishRun() {
    this.status = 'Run Completed 🏁';
    this.showToast(`🏁 Finished ${this.distance.toFixed(2)} KM`);
  }

  async showToast(msg: string) {

    const toast = await this.toastController.create({
      message: msg,
      duration: 1800,
      position: 'top',
      color: 'dark'
    });

    await toast.present();
  }

  ionViewWillLeave() {
    clearInterval(this.interval);
  }
}