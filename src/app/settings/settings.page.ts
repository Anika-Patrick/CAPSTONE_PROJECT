import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SettingsPage {

  userName: string = '';

  reminder = true;
  notifications = true;
  tracking = false;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.userName = localStorage.getItem('username') || 'Guest';
  }

  logout() {
    localStorage.removeItem('username');
    this.navCtrl.navigateRoot('/login');
  }
}