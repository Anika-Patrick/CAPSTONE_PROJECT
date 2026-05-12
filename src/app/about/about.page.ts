import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AboutPage {

  constructor(private navCtrl: NavController) {}

  goBack() {
    // fallback route (IMPORTANT FIX)
    this.navCtrl.navigateRoot('/tabs/tab1');
  }
}