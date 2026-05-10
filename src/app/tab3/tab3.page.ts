import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FitnessService } from '../services/fitness.service';

@Component({
  selector: 'app-tab3',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss']
})
export class Tab3Page implements OnInit {

  userQuestion = '';
  chatMessages: any[] = [];

  quickQuestions = [
    'Veg Meal',
    'Non Veg Meal',
    'Workout',
    'Calories',
    'Motivation'
  ];

  constructor(public fitness: FitnessService) {}

  ngOnInit() {
    this.chatMessages.push({
      sender: 'bot',
      text: `Welcome to FitnessGPT 👋
Ask me anything about fitness!`
    });
  }

  selectQuickQuestion(q: string) {
    this.userQuestion = q;
    this.sendMessage();
  }

  sendMessage() {
    const question = this.userQuestion.trim();
    if (!question) return;

    // user message
    this.chatMessages.push({
      sender: 'user',
      text: question
    });

    // backend call
    this.fitness.sendMessage(question).subscribe({
      next: (res) => {
        this.chatMessages.push({
          sender: 'bot',
          text: res.answer
        });
      },
      error: () => {
        this.chatMessages.push({
          sender: 'bot',
          text: '⚠️ Server not responding'
        });
      }
    });

    this.userQuestion = '';
  }
}