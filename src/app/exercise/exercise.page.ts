import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FitnessService } from '../services/fitness';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss']
})
export class ExercisePage implements OnInit {

  category = '';
  index = 0;

  exercises: any[] = [];

  // 🔥 TOTAL CALORIES (for session)
  totalCalories = 0;

  constructor(
    private route: ActivatedRoute,
    private fitness: FitnessService,
    private toast: ToastController,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('id') || '';
    this.loadExercises();
  }

  // 📦 LOAD EXERCISES
  loadExercises() {
    const data: any = {

      Chest: [
        { name: 'Push Ups', sets: 3, reps: 15, cal: 50, video: 'https://www.youtube.com/embed/IODxDxX7oi4' },
        { name: 'Bench Press', sets: 4, reps: 10, cal: 80, video: 'https://www.youtube.com/embed/rT7DgCr-3pg' },
        { name: 'Incline Press', sets: 3, reps: 12, cal: 60, video: 'https://www.youtube.com/embed/8iPEnn-ltC8' },
        { name: 'Chest Fly', sets: 3, reps: 12, cal: 50, video: 'https://www.youtube.com/embed/eozdVDA78K0' },
        { name: 'Dips', sets: 3, reps: 10, cal: 70, video: 'https://www.youtube.com/embed/2z8JmcrW-As' }
      ],

      Legs: [
        { name: 'Squats', sets: 4, reps: 12, cal: 100, video: 'https://www.youtube.com/embed/aclHkVaku9U' },
        { name: 'Lunges', sets: 3, reps: 12, cal: 80, video: 'https://www.youtube.com/embed/QOVaHwm-Q6U' },
        { name: 'Deadlift', sets: 4, reps: 8, cal: 120, video: 'https://www.youtube.com/embed/op9kVnSso6Q' },
        { name: 'Leg Press', sets: 3, reps: 10, cal: 90, video: 'https://www.youtube.com/embed/IZxyjW7MPJQ' },
        { name: 'Calf Raises', sets: 3, reps: 20, cal: 40, video: 'https://www.youtube.com/embed/-M4-G8p8fmc' }
      ],

      Arms: [
        { name: 'Bicep Curl', sets: 3, reps: 12, cal: 40, video: 'https://www.youtube.com/embed/ykJmrZ5v0Oo' },
        { name: 'Tricep Dips', sets: 3, reps: 12, cal: 50, video: 'https://www.youtube.com/embed/2z8JmcrW-As' },
        { name: 'Hammer Curl', sets: 3, reps: 12, cal: 45, video: 'https://www.youtube.com/embed/zC3nLlEvin4' },
        { name: 'Pushdown', sets: 3, reps: 12, cal: 50, video: 'https://www.youtube.com/embed/2-LAMcpzODU' },
        { name: 'Chin Ups', sets: 3, reps: 8, cal: 70, video: 'https://www.youtube.com/embed/brhRXlOhsAM' }
      ],

      Shoulders: [
        { name: 'Shoulder Press', sets: 3, reps: 10, cal: 60, video: 'https://www.youtube.com/embed/B-aVuyhvLHU' },
        { name: 'Lateral Raise', sets: 3, reps: 12, cal: 40, video: 'https://www.youtube.com/embed/3VcKaXpzqRo' },
        { name: 'Front Raise', sets: 3, reps: 12, cal: 40, video: 'https://www.youtube.com/embed/-t7fuZ0KhDA' },
        { name: 'Arnold Press', sets: 3, reps: 10, cal: 65, video: 'https://www.youtube.com/embed/vj2w851ZHRM' },
        { name: 'Shrugs', sets: 3, reps: 15, cal: 50, video: 'https://www.youtube.com/embed/cJRVVxmytaM' }
      ],

      Abs: [
        { name: 'Crunches', sets: 3, reps: 20, cal: 40, video: 'https://www.youtube.com/embed/Xyd_fa5zoEU' },
        { name: 'Plank', sets: 3, reps: 60, cal: 50, video: 'https://www.youtube.com/embed/pSHjTRCQxIw' },
        { name: 'Leg Raise', sets: 3, reps: 15, cal: 45, video: 'https://www.youtube.com/embed/l4kQd9eWclE' },
        { name: 'Mountain Climbers', sets: 3, reps: 20, cal: 60, video: 'https://www.youtube.com/embed/nmwgirgXLYM' },
        { name: 'Russian Twist', sets: 3, reps: 20, cal: 50, video: 'https://www.youtube.com/embed/wkD8rjkodUI' }
      ]

    };

    this.exercises = data[this.category] || [];
  }

  // 🔐 SAFE VIDEO
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // ✅ COMPLETE EXERCISE
  async completeExercise() {

    const ex = this.exercises[this.index];

    // 🔥 ADD CALORIES
    this.totalCalories += ex.cal;

    // 🔗 SYNC WITH TAB 1
    this.fitness.calories += ex.cal;
    this.fitness.tokens += 1;

    this.fitness.saveStats();

    // 🎉 TOAST MESSAGE
    const toast = await this.toast.create({
      message: `🔥 ${ex.cal} kcal burned! Keep going!`,
      duration: 2000,
      color: 'success'
    });

    toast.present();

    this.index++;

    // 🎯 BONUS AFTER FULL WORKOUT
    if (this.index === this.exercises.length) {
      this.fitness.tokens += 5;
      this.fitness.saveStats();

      const doneToast = await this.toast.create({
        message: `🎉 Workout Complete! +5 Bonus Tokens`,
        duration: 2500,
        color: 'warning'
      });

      doneToast.present();
    }
  }
}