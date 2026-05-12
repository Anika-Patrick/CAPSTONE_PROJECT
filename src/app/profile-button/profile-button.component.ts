import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProfileButtonComponent {

  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }

}