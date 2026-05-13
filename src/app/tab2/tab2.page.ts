import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FitnessService } from '../services/fitness';
import { RouterLink } from '@angular/router';
import { AppHeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, CommonModule,AppHeaderComponent],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(public fitness: FitnessService) {}

  // ================= STATE =================
  selectedCategory: string = 'Chest';
  selectedLevel: string = 'Beginner';
  todayWorkoutText: string = '';
  showDailyWorkout = false;

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
    { name: 'Back', emoji: '🔥' },
    { name: 'Legs', emoji: '🦵' },
    { name: 'Shoulders', emoji: '🔥' },
    { name: 'Arms', emoji: '🏋️' },
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
      0: {
        day: 'Sunday',
        text: '🛌 Rest Day',
        parts: []
      },
      1: {
        day: 'Monday',
        text: '💪 Chest + Triceps',
        parts: ['Chest', 'Triceps']
      },
      2: {
        day: 'Tuesday',
        text: '🔥 Back + Biceps',
        parts: ['Back', 'Biceps']
      },
      3: {
        day: 'Wednesday',
        text: '🦵 Legs Day',
        parts: ['Legs', 'Quads', 'Hamstrings', 'Calves']
      },
      4: {
        day: 'Thursday',
        text: '⚡ Shoulders + Abs',
        parts: ['Shoulders', 'Abs']
      },
      5: {
        day: 'Friday',
        text: '💥 Arms Day',
        parts: ['Arms', 'Forearms']
      },
      6: {
        day: 'Saturday',
        text: '🏋️ Full Body',
        parts: this.categories.map(c => c.name)
      }
    };

    const today = plan[day];
    this.todayWorkoutText = today.text;

    alert(`📅 ${today.day}\n${today.text}`);

    if (today.parts.length > 0) {
      this.filteredCategories = this.categories.filter(c =>
        today.parts.includes(c.name)
      );
    } else {
      this.filteredCategories = [];
    }
  }

  toggleDailyWorkout() {
    this.showDailyWorkout = !this.showDailyWorkout;
    if (this.showDailyWorkout) {
      this.getTodayWorkout();
    }
  }

  // ================= YOUR EXERCISES =================
  // ================= WORKOUT GIFS =================

categoryGifs: any = {
  Chest: 'assets/workouts/chest.gif',
  Back: 'assets/workouts/back/latpulldown.gif',
  Legs: 'assets/workouts/legs.gif',
  Shoulders: 'assets/workouts/shoulders.gif',
  Arms: 'assets/workouts/arms.gif',
  Abs: 'assets/workouts/abs.gif',
  Biceps: 'assets/workouts/biceps.gif',
  Triceps: 'assets/workouts/triceps.gif',
  Forearms: 'assets/workouts/forearms.gif',
  Quads: 'assets/workouts/quads.gif',
  Hamstrings: 'assets/workouts/hamstrings.gif',
  Calves: 'assets/workouts/calves.gif'
};
exerciseGifs: any = {

  // ================= CHEST =================
  'Push Ups': 'assets/workouts/chest/pushups.gif',
'Incline Push Ups': 'assets/workouts/chest/inclinepushups.gif',
'Knee Push Ups': 'assets/workouts/chest/kneepushups.gif',
'Wall Push Ups': 'assets/workouts/chest/wallpushups.gif',
'Chest Press light':'assets/workouts/chest/Declinepushup.gif',
'Bench Press': 'assets/workouts/chest/benchpress.gif',
'Barbell Bench Press': 'assets/workouts/chest/heavybenchpress.gif',
'Incline Dumbbell Press': 'assets/workouts/chest/inclinedumbbellpress.gif',
'Chest Fly': 'assets/workouts/chest/chestfly.gif',
'Decline Push Ups': 'assets/workouts/chest/Declinepushup.gif',
'Cable Press': 'assets/workouts/chest/cablepress.gif',
'Cable Chest Press': 'assets/workouts/chest/cablepress.gif',
'Weighted Push Ups': 'assets/workouts/chest/heavybenchpress.gif', // no separate weightedpushups.gif found
'Heavy Bench Press': 'assets/workouts/chest/heavybenchpress.gif',
'Cable Fly': 'assets/workouts/chest/cablefly.gif',
'Dips': 'assets/workouts/chest/dips.gif',
'Dips (Chest Focus)': 'assets/workouts/chest/dips.gif',
'Explosive Push Ups': 'assets/workouts/chest/explosivepushups.gif',

  // ================= BACK =================
  'Superman Hold': 'assets/workouts/back/supermanhold.gif',
'Resistance Band Pull': 'assets/workouts/back/resistancebandpull.gif',
'Reverse Snow Angels': 'assets/workouts/back/reversesnowangeles.gif',
'Wall Slides': 'assets/workouts/back/wallslides.gif',
'Bird Dog': 'assets/workouts/back/birddog.gif',
'Pull Ups': 'assets/workouts/back/pullups.gif',
'Assisted Pull Ups': 'assets/workouts/back/pullups.gif',
'Lat Pulldown': 'assets/workouts/back/latpulldown.gif',
'Seated Row': 'assets/workouts/back/seatedrow.gif',
'Seated Cable Row': 'assets/workouts/back/seatedrow.gif',
'Bent Over Row': 'assets/workouts/back/bendoverrow.gif',
'Deadlift Light': 'assets/workouts/back/deadliftlight.gif',
'Deadlift (Light)': 'assets/workouts/back/deadliftlight.gif',
'Weighted Pull Ups': 'assets/workouts/back/weightedpullups.gif',
'Deadlift': 'assets/workouts/back/deadlift.gif',
'T Bar Row': 'assets/workouts/back/T-Bar-Row.gif',
'T-Bar Row': 'assets/workouts/back/T-Bar-Row.gif',
'Single Arm Row': 'assets/workouts/back/singlearmrow.gif',
'Muscle Up': 'assets/workouts/back/Muscle-up.gif',

  // ================= LEGS =================
'Bodyweight Squats': 'assets/workouts/legs/bodyweight-squat.gif',
'Step Ups': 'assets/workouts/legs/stepups.gif',
'Glute Bridge': 'assets/workouts/legs/glute-Bridge.gif',
'Wall Sit': 'assets/workouts/legs/wallsit.gif',
'Calf Raises': 'assets/workouts/calves.gif', 
'Squats': 'assets/workouts/legs/bodyweight-squat.gif',
'Lunges': 'assets/workouts/legs/Bulgarian-Split-Squat.gif',
'Leg Press': 'assets/workouts/legs/BARBELL-SQUAT.gif', // fallback
'Step Lunges': 'assets/workouts/legs/stepups.gif',
'Hip Thrust': 'assets/workouts/legs/glute-Bridge.gif',
'Barbell Squats': 'assets/workouts/legs/BARBELL-SQUAT.gif',
'Jump Squats': 'assets/workouts/legs/Jump-Squat.gif',
'Bulgarian Split Squat': 'assets/workouts/legs/Bulgarian-Split-Squat.gif',
'Sprints': 'assets/workouts/legs/Jump-Squat.gif',

  // ================= SHOULDERS =================
'Arm Circles': 'assets/workouts/shoulders/Armcircles.gif',
'Shoulder Press': 'assets/workouts/shoulders/Shoulder-Press.gif',
'Front Raise': 'assets/workouts/shoulders/frontraise.gif',
'Front Raise (Light)': 'assets/workouts/shoulders/frontraise.gif',
'Wall Press': 'assets/workouts/shoulders/wallpress.gif',
'Wall Shoulder Press': 'assets/workouts/shoulders/wallshoulderpress.gif',
'Light Lateral Raise': 'assets/workouts/shoulders/lateralraise.gif',
'Lateral Raise (Light)': 'assets/workouts/shoulders/lateralraise.gif',
'Dumbbell Press': 'assets/workouts/shoulders/Shoulder-Press.gif',
'Lateral Raise': 'assets/workouts/shoulders/lateralraise.gif',
'Rear Delt Fly': 'assets/workouts/shoulders/reardeltfly.gif',
'Arnold Press': 'assets/workouts/shoulders/Arnold-Press.gif',
'Cable Raise': 'assets/workouts/shoulders/lateralraise.gif',
'Heavy Press': 'assets/workouts/shoulders/heavypress.gif',
'Heavy Shoulder Press': 'assets/workouts/shoulders/heavypress.gif',
'Handstand Push Ups': 'assets/workouts/shoulders/handstandpushup.gif',
'Upright Row': 'assets/workouts/shoulders/heavypress.gif',
'Plate Raise': 'assets/workouts/shoulders/plateraise.gif',
'Cable Lateral Raise': 'assets/workouts/shoulders/lateralraise.gif',
'Push Press': 'assets/workouts/shoulders/heavypress.gif',
'Explosive Press': 'assets/workouts/shoulders/heavypress.gif',

// ================= ABS =================
'Crunches': 'assets/workouts/abs/Crunches.gif',
'Leg Raise': 'assets/workouts/abs/legraise.gif',
'Plank': 'assets/workouts/abs/plank.gif',
'Sit Ups': 'assets/workouts/abs/situps.gif',
'Toe Touch': 'assets/workouts/abs/Crunches.gif',
'Toe Touch Crunch': 'assets/workouts/abs/Crunches.gif',
'Bicycle Crunch': 'assets/workouts/abs/Bicyclecrunch.gif',
'Hanging Knee Raise': 'assets/workouts/abs/HangingKneeraise.gif',
'Russian Twist': 'assets/workouts/abs/Bicyclecrunch.gif',
'Reverse Crunch': 'assets/workouts/abs/Crunches.gif',
'Dragon Flag': 'assets/workouts/abs/dragonflag.gif',
'Hanging Leg Raise': 'assets/workouts/abs/HangingKneeraise.gif',
'V Ups': 'assets/workouts/abs/legraise.gif',
'V-Ups': 'assets/workouts/abs/legraise.gif',
'Toe to Bar': 'assets/workouts/abs/HangingKneeraise.gif',
'Toes to Bar': 'assets/workouts/abs/HangingKneeraise.gif',
'Weighted Plank': 'assets/workouts/abs/plank.gif',

// ================= ARMS =================
'Wall Arm Push': 'assets/workouts/shoulders/wallpress.gif',
'Light Dumbbell Press': 'assets/workouts/shoulders/Shoulder-Press.gif',
'Standing Punches': 'assets/workouts/arms/standingpunches.gif',
'Dumbbell Shoulder Press': 'assets/workouts/shoulders/Shoulder-Press.gif',
'Battle Rope Waves': 'assets/workouts/arms/battleropewaves.gif',
'Pike Push Ups': 'assets/workouts/shoulders/pikepushups.gif',
'Pike Push Ups (Easy)': 'assets/workouts/shoulders/pikepushups.gif',
'Handstand Hold': 'assets/workouts/arms/handstandhold.gif',
'Heavy Dumbbell Press': 'assets/workouts/shoulders/heavypress.gif',
'Explosive Battle Ropes': 'assets/workouts/arms/explosivebattleropes.gif',
'Military Press': 'assets/workouts/shoulders/heavypress.gif',

// ================= BICEPS =================
'Light Dumbbell Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'Resistance Band Curl': 'assets/workouts/back/resistancebandpull.gif',
'Seated Dumbbell Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'Hammer Curl': 'assets/workouts/biceps.gif',
'Concentration Curl': 'assets/workouts/shoulders/heavypress.gif',
'Barbell Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'Incline Dumbbell Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'Cable Curl': 'assets/workouts/chest/cablepress.gif',
'Reverse Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'EZ Bar Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'Preacher Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'Spider Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'21s Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'Heavy Barbell Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'Chin Ups': 'assets/workouts/back/pullups.gif',

// ================= TRICEPS =================
'Bench Dips': 'assets/workouts/chest/dips.gif',
'Wall Tricep Push': 'assets/workouts/shoulders/wallpress.gif',
'Overhead Dumbbell Extension': 'assets/workouts/shoulders/Shoulder-Press.gif',
'Tricep Kickback': 'assets/workouts/shoulders/reardeltfly.gif',
'Resistance Band Pushdown': 'assets/workouts/back/resistancebandpull.gif',
'Cable Pushdown': 'assets/workouts/chest/cablepress.gif',
'Close Grip Push Ups': 'assets/workouts/chest/pushups.gif',
'Skull Crushers': 'assets/workouts/chest/benchpress.gif',
'Overhead Cable Extension': 'assets/workouts/shoulders/Shoulder-Press.gif',
'Parallel Bar Dips': 'assets/workouts/chest/dips.gif',
'Weighted Dips': 'assets/workouts/chest/dips.gif',
'Diamond Push Ups': 'assets/workouts/chest/pushups.gif',
'Heavy Skull Crushers': 'assets/workouts/chest/benchpress.gif',
'Single Arm Pushdown': 'assets/workouts/chest/cablepress.gif',
'Explosive Bench Dips': 'assets/workouts/chest/dips.gif',

// ================= QUADS ==================
'Static Lunges': 'assets/workouts/quads/walkinglunges.gif',
'Chair Squats': 'assets/workouts/legs/bodyweight-squat.gif',
'Goblet Squats': 'assets/workouts/quads/GobletSquat.gif',
'Bulgarian Split Squats': 'assets/workouts/legs/Bulgarian-Split-Squat.gif',
'Walking Lunges': 'assets/workouts/quads/walkinglunges.gif',
'Front Squats': 'assets/workouts/legs/BARBELL-SQUAT.gif', // fallback
'Pistol Squats': 'assets/workouts/quads/stepdown.gif',
'Weighted Jump Squats': 'assets/workouts/legs/Jump-Squat.gif',
'Hack Squats': 'assets/workouts/legs/BARBELL-SQUAT.gif',

/// ================= HAMSTRINGS =================
'Glute Bridges': 'assets/workouts/legs/glute-Bridge.gif',
'Standing Leg Curl': 'assets/workouts/hamstrings/gm.gif', // fallback
'Good Mornings (Light)': 'assets/workouts/hamstrings/gm.gif',
'Bridge Hold': 'assets/workouts/legs/glute-Bridge.gif',
'Resistance Band Deadlift': 'assets/workouts/hamstrings/Cable-Pull-Through.gif',
'Romanian Deadlift': 'assets/workouts/hamstrings/gm.gif',
'Swiss Ball Leg Curl': 'assets/workouts/hamstrings/gm.gif', // fallback
'Kettlebell Deadlift': 'assets/workouts/hamstrings/kettlebellswing.gif',
'Single Leg Deadlift': 'assets/workouts/hamstrings/gm.gif',
'Hamstring Curl Machine': 'assets/workouts/hamstrings/Cable-Pull-Through.gif',
'Barbell Deadlift': 'assets/workouts/legs/BARBELL-SQUAT.gif',
'Nordic Hamstring Curl': 'assets/workouts/hamstrings/gm.gif', // fallback
'Stiff Leg Deadlift': 'assets/workouts/hamstrings/gm.gif',
'Single Leg Romanian Deadlift': 'assets/workouts/hamstrings/gm.gif',

// ================= CALVES =================
'Standing Calf Raises': 'assets/workouts/calves/standingcalfraise.gif',
'Seated Calf Raises': 'assets/workouts/calves/Donkey-Calf-Raise.gif',
'Toe Walk': 'assets/workouts/calves/standingcalfraise.gif',
'Single Leg Calf Raise': 'assets/workouts/calves/Donkey-Calf-Raise.gif',
'Wall Calf Stretch': 'assets/workouts/calves/standingcalfraise.gif',
'Weighted Calf Raises': 'assets/workouts/calves/Donkey-Calf-Raise.gif',
'Jump Rope': 'assets/workouts/calves/Skip-Jump-Rope.gif',
'Box Jumps': 'assets/workouts/calves/explohops.gif',
'Farmer Walk on Toes': 'assets/workouts/calves/standingcalfraise.gif',
'Calf Press Machine': 'assets/workouts/calves/Donkey-Calf-Raise.gif',
'Explosive Calf Jumps': 'assets/workouts/calves/explohops.gif',
'Single Leg Weighted Raise': 'assets/workouts/calves/Donkey-Calf-Raise.gif',
'Hill Sprints': 'assets/workouts/calves/explohops.gif',
'Heavy Calf Press': 'assets/workouts/calves/Donkey-Calf-Raise.gif',
'Plyometric Hops': 'assets/workouts/calves/explohops.gif',

/// ================= FOREARMS =================
'Wrist Curls': 'assets/workouts/forearms/wristroller.gif',
'Reverse Wrist Curls': 'assets/workouts/forearms/wristroller.gif',
'Grip Squeeze': 'assets/workouts/forearms/farmerwalk.gif',
'Finger Extensions': 'assets/workouts/forearms/wristroller.gif',
'Light Farmer Carry': 'assets/workouts/forearms/farmerwalk.gif',
'Hammer Curl Hold': 'assets/workouts/forearms/behindbackcurl.gif',
'Plate Pinch Hold': 'assets/workouts/forearms/farmerwalk.gif',
'Heavy Wrist Curl': 'assets/workouts/forearms/wristroller.gif',
'Reverse Barbell Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'Towel Grip Hang': 'assets/workouts/forearms/farmerwalk.gif',
'Dead Hang': 'assets/workouts/forearms/farmerwalk.gif',
'Heavy Farmer Walk': 'assets/workouts/forearms/farmerwalk.gif',
'Behind Back Wrist Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'Fat Grip Holds': 'assets/workouts/forearms/farmerwalk.gif',
'Finger Push Ups': 'assets/workouts/forearms/wristroller.gif',
};
onGifError(event: any) {
  event.target.src =
    'https://cdn-icons-png.flaticon.com/512/1048/1048941.png';
}
    workoutExercises: any = {
Arms: {
  Beginner: [
    { name: 'Arm Circles', reps: 20, time: 30 },
    { name: 'Wall Arm Push', reps: 12, time: 30 },
    { name: 'Resistance Band Curl', reps: 10, time: 30 },
    { name: 'Light Dumbbell Press', reps: 10, time: 30 },
    { name: 'Hammer Curl', reps: 20, time: 30 }
  ],
  Moderate: [
    { name: 'Dumbbell Shoulder Press', reps: 12, time: 35 },
    { name: 'Hammer Curl', reps: 12, time: 35 },
    { name: 'Tricep Kickbacks', reps: 12, time: 35 },
    { name: 'Arnold Press', reps: 10, time: 40 },
    { name: 'Battle Rope Waves', reps: 20, time: 40 }
  ],
  Advanced: [
    { name: 'Pike Push Ups', reps: 15, time: 40 },
    { name: 'Handstand Hold', reps: 1, time: 45 },
    { name: 'Heavy Dumbbell Press', reps: 10, time: 45 },
    { name: 'Explosive Battle Ropes', reps: 25, time: 45 },
    { name: 'Military Press', reps: 10, time: 45 }
  ]
},

Biceps: {
  Beginner: [
    { name: 'Light Dumbbell Curl', reps: 12, time: 30 },
    { name: 'Resistance Band Curl', reps: 12, time: 30 },
    { name: 'Seated Dumbbell Curl', reps: 10, time: 30 },
    { name: 'Hammer Curl', reps: 10, time: 30 },
    { name: 'Concentration Curl', reps: 10, time: 30 }
  ],
  Moderate: [
    { name: 'Barbell Curl', reps: 12, time: 35 },
    { name: 'Incline Dumbbell Curl', reps: 10, time: 35 },
    { name: 'Cable Curl', reps: 12, time: 35 },
    { name: 'Reverse Curl', reps: 10, time: 35 },
    { name: 'EZ Bar Curl', reps: 10, time: 40 }
  ],
  Advanced: [
    { name: 'Preacher Curl', reps: 12, time: 40 },
    { name: 'Spider Curl', reps: 12, time: 40 },
    { name: '21s Curl', reps: 21, time: 45 },
    { name: 'Heavy Barbell Curl', reps: 8, time: 45 },
    { name: 'Chin Ups', reps: 12, time: 45 }
  ]
},

Triceps: {
  Beginner: [
    { name: 'Bench Dips', reps: 10, time: 30 },
    { name: 'Wall Tricep Push', reps: 12, time: 30 },
    { name: 'Overhead Dumbbell Extension', reps: 10, time: 30 },
    { name: 'Tricep Kickback', reps: 10, time: 30 },
    { name: 'Resistance Band Pushdown', reps: 12, time: 30 }
  ],
  Moderate: [
    { name: 'Cable Pushdown', reps: 12, time: 35 },
    { name: 'Close Grip Push Ups', reps: 12, time: 35 },
    { name: 'Skull Crushers', reps: 10, time: 35 },
    { name: 'Overhead Cable Extension', reps: 10, time: 35 },
    { name: 'Parallel Bar Dips', reps: 10, time: 40 }
  ],
  Advanced: [
    { name: 'Weighted Dips', reps: 12, time: 45 },
    { name: 'Diamond Push Ups', reps: 15, time: 40 },
    { name: 'Heavy Skull Crushers', reps: 8, time: 45 },
    { name: 'Single Arm Pushdown', reps: 12, time: 40 },
    { name: 'Explosive Bench Dips', reps: 15, time: 40 }
  ]
},

Quads: {
  Beginner: [
    { name: 'Bodyweight Squats', reps: 15, time: 30 },
    { name: 'Wall Sit', reps: 1, time: 30 },
    { name: 'Step Ups', reps: 12, time: 30 },
    { name: 'Static Lunges', reps: 10, time: 30 },
    { name: 'Chair Squats', reps: 12, time: 30 }
  ],
  Moderate: [
    { name: 'Goblet Squats', reps: 12, time: 35 },
    { name: 'Bulgarian Split Squats', reps: 10, time: 40 },
    { name: 'Leg Press', reps: 12, time: 40 },
    { name: 'Walking Lunges', reps: 14, time: 40 },
    { name: 'Jump Squats', reps: 15, time: 35 }
  ],
  Advanced: [
    { name: 'Barbell Squats', reps: 10, time: 45 },
    { name: 'Front Squats', reps: 10, time: 45 },
    { name: 'Pistol Squats', reps: 8, time: 45 },
    { name: 'Weighted Jump Squats', reps: 12, time: 40 },
    { name: 'Hack Squats', reps: 12, time: 45 }
  ]
},

Hamstrings: {
  Beginner: [
    { name: 'Glute Bridges', reps: 15, time: 30 },
    { name: 'Standing Leg Curl', reps: 12, time: 30 },
    { name: 'Good Mornings (Light)', reps: 10, time: 30 },
    { name: 'Bridge Hold', reps: 1, time: 30 },
    { name: 'Resistance Band Deadlift', reps: 12, time: 30 }
  ],
  Moderate: [
    { name: 'Romanian Deadlift', reps: 12, time: 40 },
    { name: 'Swiss Ball Leg Curl', reps: 12, time: 35 },
    { name: 'Kettlebell Deadlift', reps: 12, time: 40 },
    { name: 'Single Leg Deadlift', reps: 10, time: 40 },
    { name: 'Hamstring Curl Machine', reps: 12, time: 35 }
  ],
  Advanced: [
    { name: 'Barbell Deadlift', reps: 8, time: 45 },
    { name: 'Nordic Hamstring Curl', reps: 10, time: 45 },
    { name: 'Stiff Leg Deadlift', reps: 10, time: 45 },
    { name: 'Single Leg Romanian Deadlift', reps: 12, time: 45 },
    { name: 'Weighted Hip Thrust', reps: 12, time: 45 }
  ]
},

Calves: {
  Beginner: [
    { name: 'Standing Calf Raises', reps: 15, time: 30 },
    { name: 'Seated Calf Raises', reps: 15, time: 30 },
    { name: 'Toe Walk', reps: 20, time: 30 },
    { name: 'Single Leg Calf Raise', reps: 10, time: 30 },
    { name: 'Wall Calf Stretch', reps: 1, time: 30 }
  ],
  Moderate: [
    { name: 'Weighted Calf Raises', reps: 15, time: 35 },
    { name: 'Jump Rope', reps: 40, time: 40 },
    { name: 'Box Jumps', reps: 12, time: 40 },
    { name: 'Farmer Walk on Toes', reps: 20, time: 40 },
    { name: 'Calf Press Machine', reps: 15, time: 35 }
  ],
  Advanced: [
    { name: 'Explosive Calf Jumps', reps: 20, time: 45 },
    { name: 'Single Leg Weighted Raise', reps: 15, time: 45 },
    { name: 'Hill Sprints', reps: 10, time: 45 },
    { name: 'Heavy Calf Press', reps: 12, time: 45 },
    { name: 'Plyometric Hops', reps: 20, time: 45 }
  ]
},

Forearms: {
  Beginner: [
    { name: 'Wrist Curls', reps: 15, time: 30 },
    { name: 'Reverse Wrist Curls', reps: 15, time: 30 },
    { name: 'Grip Squeeze', reps: 20, time: 30 },
    { name: 'Finger Extensions', reps: 15, time: 30 },
    { name: 'Light Farmer Carry', reps: 20, time: 30 }
  ],
  Moderate: [
    { name: 'Hammer Curl Hold', reps: 12, time: 35 },
    { name: 'Plate Pinch Hold', reps: 1, time: 40 },
    { name: 'Heavy Wrist Curl', reps: 12, time: 35 },
    { name: 'Reverse Barbell Curl', reps: 12, time: 35 },
    { name: 'Towel Grip Hang', reps: 1, time: 40 }
  ],
  Advanced: [
    { name: 'Dead Hang', reps: 1, time: 45 },
    { name: 'Heavy Farmer Walk', reps: 25, time: 45 },
    { name: 'Behind Back Wrist Curl', reps: 15, time: 45 },
    { name: 'Fat Grip Holds', reps: 1, time: 45 },
    { name: 'Finger Push Ups', reps: 10, time: 45 }
  ]
},
  Chest: {
    Beginner: [
      { name: 'Wall Push Ups', reps: 12, time: 30 },
      { name: 'Incline Push Ups', reps: 10, time: 30 },
      { name: 'Knee Push Ups', reps: 10, time: 30 },
      { name: 'Push Ups', reps: 8, time: 30 },
      { name: 'Chest Press light', reps: 10, time: 30 }
    ],
    Moderate: [
      { name: 'Bench Press', reps: 10, time: 35 },
      { name: 'Incline Dumbbell Press', reps: 10, time: 40 },
      { name: 'Chest Fly', reps: 12, time: 35 },
      { name: 'Decline Push Ups', reps: 12, time: 30 },
      { name: 'Cable Chest Press', reps: 10, time: 35 }
    ],
    Advanced: [
      { name: 'Weighted Push Ups', reps: 15, time: 40 },
      { name: 'Barbell Bench Press', reps: 8, time: 45 },
      { name: 'Cable Fly', reps: 12, time: 35 },
      { name: 'Dips (Chest Focus)', reps: 12, time: 40 },
      { name: 'Explosive Push Ups', reps: 10, time: 30 }
    ]
  },

  Back: {
    Beginner: [
      { name: 'Superman Hold', reps: 10, time: 30 },
      { name: 'Bird Dog', reps: 12, time: 30 },
      { name: 'Wall Slides', reps: 10, time: 30 },
      { name: 'Resistance Band Pull', reps: 12, time: 30 },
      { name: 'Reverse Snow Angels', reps: 10, time: 30 }
    ],
    Moderate: [
      { name: 'Assisted Pull Ups', reps: 8, time: 35 },
      { name: 'Lat Pulldown', reps: 10, time: 40 },
      { name: 'Seated Cable Row', reps: 12, time: 35 },
      { name: 'Bent Over Row', reps: 10, time: 40 },
      { name: 'Deadlift (Light)', reps: 10, time: 40 }
    ],
    Advanced: [
      { name: 'Pull Ups', reps: 8, time: 45 },
      { name: 'Weighted Pull Ups', reps: 6, time: 50 },
      { name: 'Deadlift', reps: 8, time: 50 },
      { name: 'T-Bar Row', reps: 10, time: 45 },
      { name: 'Muscle Up', reps: 6, time: 50 }
    ]
  },

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
      { name: 'Walking Lunges', reps: 12, time: 35 },
      { name: 'Leg Press', reps: 12, time: 40 },
      { name: 'Hip Thrust', reps: 12, time: 35 },
      { name: 'Step Lunges', reps: 12, time: 35 }
    ],
    Advanced: [
      { name: 'Barbell Squats', reps: 10, time: 45 },
      { name: 'Jump Squats', reps: 15, time: 30 },
      { name: 'Bulgarian Split Squat', reps: 10, time: 40 },
      { name: 'Romanian Deadlift', reps: 8, time: 45 },
      { name: 'Sprints', reps: 1, time: 40 }
    ]
  },

  Shoulders: {
    Beginner: [
      { name: 'Arm Circles', reps: 15, time: 30 },
      { name: 'Shoulder Press', reps: 10, time: 30 },
      { name: 'Front Raise (Light)', reps: 10, time: 30 },
      { name: 'Lateral Raise (Light)', reps: 10, time: 30 },
      { name: 'Wall Press', reps: 8, time: 30 }
    ],
    Moderate: [
      { name: 'Dumbbell Shoulder Press', reps: 12, time: 35 },
      { name: 'Lateral Raise', reps: 12, time: 30 },
      { name: 'Rear Delt Fly', reps: 12, time: 30 },
      { name: 'Arnold Press', reps: 10, time: 35 },
      { name: 'Upright Row', reps: 12, time: 30 }
    ],
    Advanced: [
      { name: 'Heavy Shoulder Press', reps: 8, time: 40 },
      { name: 'Handstand Push Ups', reps: 8, time: 45 },
      { name: 'Plate Raise', reps: 12, time: 35 },
      { name: 'Cable Lateral Raise', reps: 12, time: 35 },
      { name: 'Push Press', reps: 10, time: 40 }
    ]
  },

  // ================= ABS =================
  Abs: {
    Beginner: [
      { name: 'Crunches', reps: 15, time: 30 },
      { name: 'Leg Raise', reps: 10, time: 30 },
      { name: 'Plank', reps: 1, time: 30 },
      { name: 'Sit Ups', reps: 12, time: 30 },
      { name: 'Toe Touch Crunch', reps: 12, time: 30 }
    ],
    Moderate: [
      { name: 'Bicycle Crunch', reps: 20, time: 30 },
      { name: 'Russian Twist', reps: 20, time: 30 },
      { name: 'Hanging Knee Raise', reps: 12, time: 35 },
      { name: 'Reverse Crunch', reps: 12, time: 30 },
      { name: 'Plank', reps: 1, time: 45 }
    ],
    Advanced: [
      { name: 'Dragon Flag', reps: 8, time: 40 },
      { name: 'Hanging Leg Raise', reps: 12, time: 40 },
      { name: 'V-Ups', reps: 15, time: 35 },
      { name: 'Toes to Bar', reps: 10, time: 45 },
      { name: 'Weighted Plank', reps: 1, time: 60 }
    ]
  }

    }

  // ================= INIT =================
  ngOnInit() {
    this.filteredCategories = this.categories;
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

      this.fitness.addWorkout(calories, tokens);

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