import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fitness-mode',
  templateUrl: './fitness-mode.page.html',
  styleUrls: ['./fitness-mode.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FitnessModePage {

  constructor(private router: Router) {}

  // 🏋️ WEIGHTLIFTING → ORIGINAL TAB2 PAGE
  goToGym() {
    this.router.navigate(['/tabs/weightlifting']);
  }

  // 🧘 YOGA → YOGA PAGE
  goToYoga() {
    this.router.navigate(['/tabs/yoga']);
  }

}