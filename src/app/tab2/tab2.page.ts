import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FitnessService } from '../services/fitness';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(public fitness: FitnessService) {}

  // ================= STATE =================
  selectedCategory: string = 'Chest';
  selectedLevel: string = 'Beginner';
  todayWorkoutText: string = '';

  levels = ['Beginner', 'Moderate', 'Advanced'];

  isWorkoutMode = false;
  currentExerciseIndex = 0;
  timeLeft = 30;
  reps = 10;
  workoutTimer: any;

  completedExercises = 0;
  totalExercises = 0;

  // ================= CATEGORIES =================
  categories = [
    { name: 'Chest', emoji: '💪' },
    { name: 'Legs', emoji: '🦵' },
    { name: 'Arms', emoji: '🏋️' },
    { name: 'Shoulders', emoji: '🔥' },
    { name: 'Abs', emoji: '⚡' },
    { name: 'Biceps', emoji: '💪' },
    { name: 'Triceps', emoji: '🔥' },
    { name: 'Forearms', emoji: '✊' },
    { name: 'Quads', emoji: '🦵' },
    { name: 'Hamstrings', emoji: '🏃' },
    { name: 'Calves', emoji: '🐐' }
  ];

  filteredCategories: any[] = [];

  // ================= DAILY WORKOUT =================
  getTodayWorkout() {
    const day = new Date().getDay();

    const plan: any = {
      0: { text: '🛌 Rest Day', parts: [] },
      1: { text: '💪 Chest + Triceps', parts: ['Chest', 'Triceps'] },
      2: { text: '🔥 Back + Biceps', parts: ['Arms', 'Biceps'] },
      3: { text: '🦵 Legs Day', parts: ['Legs', 'Quads', 'Hamstrings', 'Calves'] },
      4: { text: '⚡ Shoulders + Abs', parts: ['Shoulders', 'Abs'] },
      5: { text: '💥 Arms Day', parts: ['Biceps', 'Triceps'] },
      6: { text: '🏋️ Full Body', parts: this.categories.map(c => c.name) }
    };

    const today = plan[day];
    this.todayWorkoutText = today.text;

    if (today.parts.length) {
      this.filteredCategories = this.categories.filter(c =>
        today.parts.includes(c.name)
      );
    }
  }

  // ================= YOUR EXERCISES =================
 

    workoutExercises: any = {

  // ================= CHEST =================
  Chest: {
    Beginner: [
      { name: 'Push Ups', reps: 12, time: 30 },
      { name: 'Incline Push Ups', reps: 10, time: 30 },
      { name: 'Knee Push Ups', reps: 10, time: 30 },
      { name: 'Wall Push Ups', reps: 10, time: 30 },
      { name: 'Chest Press Light', reps: 10, time: 30 }
    ],
    Moderate: [
      { name: 'Bench Press', reps: 10, time: 35 },
      { name: 'Incline Dumbbell Press', reps: 10, time: 40 },
      { name: 'Chest Fly', reps: 12, time: 30 },
      { name: 'Decline Push Ups', reps: 12, time: 30 },
      { name: 'Cable Press', reps: 10, time: 35 }
    ],
    Advanced: [
      { name: 'Weighted Push Ups', reps: 15, time: 40 },
      { name: 'Heavy Bench Press', reps: 8, time: 45 },
      { name: 'Cable Fly', reps: 12, time: 35 },
      { name: 'Dips', reps: 12, time: 35 },
      { name: 'Explosive Push Ups', reps: 10, time: 30 }
    ]
  },

  // ================= BACK =================
  Back: {
    Beginner: [
      { name: 'Superman Hold', reps: 10, time: 30 },
      { name: 'Resistance Band Pull', reps: 12, time: 30 },
      { name: 'Reverse Snow Angels', reps: 10, time: 30 },
      { name: 'Wall Slides', reps: 10, time: 30 },
      { name: 'Bird Dog', reps: 12, time: 30 }
    ],
    Moderate: [
      { name: 'Pull Ups', reps: 8, time: 35 },
      { name: 'Lat Pulldown', reps: 10, time: 40 },
      { name: 'Seated Row', reps: 12, time: 35 },
      { name: 'Bent Over Row', reps: 10, time: 40 },
      { name: 'Deadlift Light', reps: 10, time: 40 }
    ],
    Advanced: [
      { name: 'Weighted Pull Ups', reps: 8, time: 45 },
      { name: 'Deadlift', reps: 8, time: 50 },
      { name: 'T Bar Row', reps: 10, time: 45 },
      { name: 'Single Arm Row', reps: 10, time: 40 },
      { name: 'Muscle Up', reps: 6, time: 50 }
    ]
  },

  // ================= LEGS =================
  Legs: {
    Beginner: [
      { name: 'Bodyweight Squats', reps: 12, time: 30 },
      { name: 'Step Ups', reps: 10, time: 30 },
      { name: 'Glute Bridge', reps: 12, time: 30 },
      { name: 'Wall Sit', reps: 1, time: 30 },
      { name: 'Calf Raises', reps: 15, time: 30 }
    ],
    Moderate: [
      { name: 'Squats', reps: 15, time: 40 },
      { name: 'Lunges', reps: 12, time: 35 },
      { name: 'Leg Press', reps: 12, time: 40 },
      { name: 'Step Lunges', reps: 12, time: 35 },
      { name: 'Hip Thrust', reps: 12, time: 35 }
    ],
    Advanced: [
      { name: 'Barbell Squats', reps: 10, time: 45 },
      { name: 'Jump Squats', reps: 15, time: 30 },
      { name: 'Bulgarian Split Squat', reps: 10, time: 40 },
      { name: 'Deadlift', reps: 8, time: 45 },
      { name: 'Sprints', reps: 1, time: 40 }
    ]
  },

  // ================= SHOULDERS =================
  Shoulders: {
    Beginner: [
      { name: 'Shoulder Press', reps: 10, time: 30 },
      { name: 'Front Raise', reps: 10, time: 30 },
      { name: 'Arm Circles', reps: 15, time: 30 },
      { name: 'Wall Press', reps: 10, time: 30 },
      { name: 'Light Lateral Raise', reps: 10, time: 30 }
    ],
    Moderate: [
      { name: 'Dumbbell Press', reps: 12, time: 30 },
      { name: 'Lateral Raise', reps: 12, time: 30 },
      { name: 'Rear Delt Fly', reps: 12, time: 30 },
      { name: 'Arnold Press', reps: 10, time: 35 },
      { name: 'Cable Raise', reps: 12, time: 30 }
    ],
    Advanced: [
      { name: 'Heavy Press', reps: 8, time: 40 },
      { name: 'Handstand Pushup', reps: 8, time: 40 },
      { name: 'Upright Row', reps: 10, time: 35 },
      { name: 'Plate Raise', reps: 12, time: 35 },
      { name: 'Explosive Press', reps: 10, time: 35 }
    ]
  },

  // ================= ABS =================
  Abs: {
    Beginner: [
      { name: 'Crunches', reps: 15, time: 30 },
      { name: 'Leg Raise', reps: 10, time: 30 },
      { name: 'Plank', reps: 1, time: 30 },
      { name: 'Sit Ups', reps: 12, time: 30 },
      { name: 'Toe Touch', reps: 12, time: 30 }
    ],
    Moderate: [
      { name: 'Bicycle Crunch', reps: 20, time: 30 },
      { name: 'Hanging Knee Raise', reps: 12, time: 30 },
      { name: 'Russian Twist', reps: 20, time: 30 },
      { name: 'Plank', reps: 1, time: 45 },
      { name: 'Reverse Crunch', reps: 12, time: 30 }
    ],
    Advanced: [
      { name: 'Dragon Flag', reps: 8, time: 40 },
      { name: 'Hanging Leg Raise', reps: 12, time: 40 },
      { name: 'V Ups', reps: 15, time: 35 },
      { name: 'Plank', reps: 1, time: 60 },
      { name: 'Toe to Bar', reps: 10, time: 40 }
    ]
  }

    }

  // ================= INIT =================
  ngOnInit() {
    this.filteredCategories = this.categories;
    this.getTodayWorkout();
  }

  // ================= FILTER =================
  openCategory(category: string) {
    this.selectedCategory = category;
  }

  changeLevel(level: string) {
    this.selectedLevel = level;
  }

  // ================= START WORKOUT =================
  startWorkout(category: string) {
    const list = this.workoutExercises?.[category]?.[this.selectedLevel];
    if (!list || list.length === 0) return;

    this.selectedCategory = category;
    this.isWorkoutMode = true;
    this.currentExerciseIndex = 0;

    this.completedExercises = 0;
    this.totalExercises = list.length;

    this.loadExercise();
  }

  loadExercise() {
    const ex = this.workoutExercises[this.selectedCategory][this.selectedLevel][this.currentExerciseIndex];
    this.reps = ex.reps;
    this.timeLeft = ex.time;
    this.runTimer();
  }

  runTimer() {
    clearInterval(this.workoutTimer);

    this.workoutTimer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.nextExercise();
      }
    }, 1000);
  }

  nextExercise() {
    this.completedExercises++;

    const list = this.workoutExercises[this.selectedCategory][this.selectedLevel];

    if (this.currentExerciseIndex < list.length - 1) {
      this.currentExerciseIndex++;
      this.loadExercise();
    } else {
      this.finishWorkout();
    }
  }

  // ================= PREV =================
  prevExercise() {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex--;
      this.loadExercise();
    }
  }

  // ================= EXIT =================
  exitWorkout() {
    this.isWorkoutMode = false;
    clearInterval(this.workoutTimer);
  }

  // ================= COMPLETE =================
  finishWorkout() {
    this.isWorkoutMode = false;
    clearInterval(this.workoutTimer);

    if (this.completedExercises >= this.totalExercises) {

      const calories = this.totalExercises * 20;
      const tokens = Math.floor(this.totalExercises / 2);

      this.fitness.calories += calories;
      this.fitness.tokens += tokens;

      const today = new Date().getDay();
      this.fitness.history[today] += calories;

      this.fitness.saveStats();
      this.fitness.saveHistory();

      alert(`🔥 Workout Completed!
+${calories} Calories
+${tokens} Tokens`);
    }
  }

  // ================= RESET =================
  clearWorkouts() {
    this.fitness.calories = 0;
    this.fitness.tokens = 0;
    this.fitness.history = [0,0,0,0,0,0,0];

    this.fitness.saveStats();
    this.fitness.saveHistory();

    alert('🧹 Workout data cleared!');
  }
}