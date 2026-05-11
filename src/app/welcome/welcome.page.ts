import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton, IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,

  imports: [
    IonContent,
    IonButton,
    CommonModule,
    FormsModule, IonIcon
  ]
})
export class WelcomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  
  goHome() {
  console.log('BUTTON CLICKED');
  this.router.navigate(['/home']);
}
}