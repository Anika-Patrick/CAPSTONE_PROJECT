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
 // ================= WORKOUT GIFS =================

categoryGifs: any = {
  Chest: 'assets/workouts/chest1.gif',
  Legs: 'assets/workouts/leg.gif',
  Arms: 'assets/workouts/arms.gif',
  Shoulders: 'assets/workouts/shoulder.gif',
  Abs: 'assets/workouts/abs.gif',
  Biceps: 'assets/workouts/biceps.gif',
  Triceps: 'assets/workouts/triceps.gifs.gif',
  Forearms: 'assets/workouts/forearms.gif',
  Quads: 'assets/workouts/leg.gif',
  Hamstrings: 'assets/workouts/hamstring.gif',
  Calves: 'assets/workouts/calves.gif'
};
exerciseGifs: any = {

  // ================= CHEST =================
  // CHEST
  'Push Ups':
    'assets/workouts/chest/pushups.gif',

  'Incline Push Ups':
    'assets/workouts/chest/inclinepushups.gif',

  'Knee Push Ups':
    'assets/workouts/chest/kneepushups.gif',

  'Wall Push Ups':
    'assets/workouts/chest/wallpushups.gif',

  'Chest Press Light':
    'assets/workouts/chest/chestpresslight.gif',

  'Bench Press':
    'assets/workouts/chest/benchpress.gif',

  'Incline Dumbbell Press':
    'assets/workouts/chest/inclinedumbbellpress.gif',

  'Chest Fly':
    'assets/workouts/chest/chestfly.gif',

  'Decline Push Ups':
    'assets/workouts/chest/Declinepushup.gif',

  'Cable Press':
    'assets/workouts/chest/cablepress.gif',

  'Weighted Push Ups':
    'assets/workouts/chest/explosivepushups.gif',

  'Heavy Bench Press':
    'assets/workouts/chest/heavybenchpress.gif',

  'Cable Fly':
    'assets/workouts/chest/cablefly.gif',

  'Dips':
    'assets/workouts/chest/dips.gif',

  'Explosive Push Ups':
    'assets/workouts/chest/explosivepushups.gif',

  // ================= BACK =================
  'Superman Hold': 'assets/workouts/back.gif',
  'Resistance Band Pull': 'assets/workouts/back.gif',
  'Reverse Snow Angels': 'assets/workouts/back.gif',
  'Wall Slides': 'assets/workouts/back.gif',
  'Bird Dog': 'assets/workouts/back.gif',
  'Pull Ups': 'assets/workouts/back.gif',
  'Lat Pulldown': 'assets/workouts/back.gif',
  'Seated Row': 'assets/workouts/back.gif',
  'Bent Over Row': 'assets/workouts/back.gif',
  'Deadlift Light': 'assets/workouts/back.gif',
  'Weighted Pull Ups': 'assets/workouts/back.gif',
  'Deadlift': 'assets/workouts/back.gif',
  'T Bar Row': 'assets/workouts/back.gif',
  'Single Arm Row': 'assets/workouts/back.gif',
  'Muscle Up': 'assets/workouts/back.gif',

  // ================= LEGS =================
  'Bodyweight Squats': 'assets/workouts/legs.gif',
  'Step Ups': 'assets/workouts/legs.gif',
  'Glute Bridge': 'assets/workouts/legs.gif',
  'Wall Sit': 'assets/workouts/legs.gif',
  'Calf Raises': 'assets/workouts/legs.gif',
  'Squats': 'assets/workouts/legs.gif',
  'Lunges': 'assets/workouts/legs.gif',
  'Leg Press': 'assets/workouts/legs.gif',
  'Step Lunges': 'assets/workouts/legs.gif',
  'Hip Thrust': 'assets/workouts/legs.gif',
  'Barbell Squats': 'assets/workouts/legs.gif',
  'Jump Squats': 'assets/workouts/legs.gif',
  'Bulgarian Split Squat': 'assets/workouts/legs.gif',
  'Sprints': 'assets/workouts/legs.gif',

  // ================= SHOULDERS =================
  'Shoulder Press': 'assets/workouts/shoulders.gif',
  'Front Raise': 'assets/workouts/shoulders.gif',
  'Arm Circles': 'assets/workouts/shoulders.gif',
  'Wall Press': 'assets/workouts/shoulders.gif',
  'Light Lateral Raise': 'assets/workouts/shoulders.gif',
  'Dumbbell Press': 'assets/workouts/shoulders.gif',
  'Lateral Raise': 'assets/workouts/shoulders.gif',
  'Rear Delt Fly': 'assets/workouts/shoulders.gif',
  'Arnold Press': 'assets/workouts/shoulders.gif',
  'Cable Raise': 'assets/workouts/shoulders.gif',
  'Heavy Press': 'assets/workouts/shoulders.gif',
  'Handstand Pushup': 'assets/workouts/shoulders.gif',
  'Upright Row': 'assets/workouts/shoulders.gif',
  'Plate Raise': 'assets/workouts/shoulders.gif',
  'Explosive Press': 'assets/workouts/shoulders.gif',

  // ================= ABS =================
  'Crunches': 'assets/workouts/abs.gif',
  'Leg Raise': 'assets/workouts/abs.gif',
  'Plank': 'assets/workouts/abs.gif',
  'Sit Ups': 'assets/workouts/abs.gif',
  'Toe Touch': 'assets/workouts/abs.gif',
  'Bicycle Crunch': 'assets/workouts/abs.gif',
  'Hanging Knee Raise': 'assets/workouts/abs.gif',
  'Russian Twist': 'assets/workouts/abs.gif',
  'Reverse Crunch': 'assets/workouts/abs.gif',
  'Dragon Flag': 'assets/workouts/abs.gif',
  'Hanging Leg Raise': 'assets/workouts/abs.gif',
  'V Ups': 'assets/workouts/abs.gif',
  'Toe to Bar': 'assets/workouts/abs.gif'
};
onGifError(event: any) {
  event.target.src =
    'https://cdn-icons-png.flaticon.com/512/1048/1048941.png';
}
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