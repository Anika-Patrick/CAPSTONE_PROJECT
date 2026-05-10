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
  Back: 'assets/workouts/back/latpulldown.gif',
  Legs: 'assets/workouts/leg.gif',
  Shoulders: 'assets/workouts/shoulder.gif',
  Arms: 'assets/workouts/arms.gif',
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
   // ================= BACK =================
  'Superman Hold': 'assets/workouts/back/supermanhold.gif',
  'Resistance Band Pull': 'assets/workouts/back/resistancebandpull.gif',
  'Reverse Snow Angels': 'assets/workouts/back/reversesnowangeles.gif',
  'Wall Slides': 'assets/workouts/back/wallslides.gif',
  'Bird Dog': 'assets/workouts/back/birddog.gif',
  'Pull Ups': 'assets/workouts/back/pullups.gif',
  'Lat Pulldown': 'assets/workouts/back/latpulldown.gif',
  'Seated Row': 'assets/workouts/back/seatedrow.gif',
  'Bent Over Row': 'assets/workouts/back/bendoverrow.gif',
  'Deadlift Light': 'assets/workouts/back/deadliftlight.gif',
  'Weighted Pull Ups': 'assets/workouts/back/weightedpullups.gif',
  'Deadlift': 'assets/workouts/back/deadlift.gif',
  'T Bar Row': 'assets/workouts/back/T-Bar-Row.gif',
  'Single Arm Row': 'assets/workouts/back/singlearmrow.gif',
  'Muscle Up': 'assets/workouts/back/Muscle-up.gif',

  // ================= LEGS =================
  'Bodyweight Squats': 'assets/workouts/legs/bodyweight-squat.gif',
  'Step Ups': 'assets/workouts/legs/stepups.gif',
  'Glute Bridge': 'assets/workouts/legs/glute-Bridge.gif',
  'Wall Sit': 'assets/workouts/legs/wallsit.gif',
  'Calf Raises': 'assets/workouts/legs/stepups.gif',
  'Squats': 'assets/workouts/legs/bodyweight-squat.gif',
  'Lunges': 'assets/workouts/legs/Jump-Squat.gif',
  'Leg Press': 'assets/workouts/leg.gif',
  'Step Lunges': 'assets/workouts/legs/Jump-Squat.gif',
  'Hip Thrust': 'assets/workouts/legs/glute-bridge.gif',
  'Barbell Squats': 'assets/workouts/legs/BARBELL-SQUAT.gif',
  'Jump Squats': 'assets/workouts/legs/Jump-Squat.gif',
  'Bulgarian Split Squat': 'assets/workouts/legs/Bulgarian-Split-Squat.gif',
  'Sprints': 'assets/workouts/legs/Jump-Squat.gif',

  // ================= SHOULDERS =================
  'Shoulder Press': 'assets/workouts/shoulders/Shoulder-Press.gif',
  'Front Raise': 'assets/workouts/shoulders/frontraise.gif',
  'Arm Circles': 'assets/workouts/shoulders/Armcircles.gif',
  'Wall Press': 'assets/workouts/shoulders/wallpress.gif',
  'Light Lateral Raise': 'assets/workouts/shoulders/lateralraise.gif',
  'Dumbbell Press': 'assets/workouts/shoulder.gif',
  'Lateral Raise': 'assets/workouts/shoulders/lateralraise.gif',
  'Rear Delt Fly': 'assets/workouts/shoulders/reardeltfly.gif',
  'Arnold Press': 'assets/workouts/shoulders/Arnold-Press.gif',
  'Cable Raise': 'assets/workouts/shoulders/lateralraise.gif',
  'Heavy Press': 'assets/workouts/shoulders/heavypress.gif',
  'Handstand Pushup': 'assets/workouts/chest/pushups.gif',
  'Upright Row': 'assets/workouts/back/seatedrow.gif',
  'Plate Raise': 'assets/workouts/shoulders/plateraise.gif',
  'Explosive Press': 'assets/workouts/shoulders/heavypress.gif',

// ================= ARMS GIFS =================
'Arms Circles': 'assets/workouts/arms/armcircles.gif',
'Push ups': 'assets/workouts/arms/pushups.gif',
'Hammer Curls': 'assets/workouts/arms/hammercurls.gif',
'Tricep Dips': 'assets/workouts/arms/tricepdips.gif',
'Bicep Curls': 'assets/workouts/arms/bicepcurls.gif',
'Diamond Push Ups': 'assets/workouts/arms/diamondpushups.gif',
'Concentration Curls': 'assets/workouts/arms/concentrationcurls.gif',
'Bench Dips': 'assets/workouts/arms/benchdips.gif',
'Barbell Curl': 'assets/workouts/arms/barbellcurl.gif',
'Overhead Tricep Extension': 'assets/workouts/arms/overheadtricepextension.gif',
'Cable Curl': 'assets/workouts/arms/cablecurl.gif',
'Rope Pushdown': 'assets/workouts/arms/ropepushdown.gif',
'Spider Curl': 'assets/workouts/arms/spidercurl.gif',
'Kickbacks': 'assets/workouts/arms/kickbacks.gif',
'Weighted Dips': 'assets/workouts/arms/weighteddips.gif',

  // ================= ABS =================
  'Crunches': 'assets/workouts/abs/Crunches.gif',
  'Leg Raise': 'assets/workouts/abs/legraise.gif',
  'Plank': 'assets/workouts/abs/plank.gif',
  'Sit Ups': 'assets/workouts/abs/situps.gif',
  'Toe Touch': 'assets/workouts/abs/Crunches.gif',
  'Bicycle Crunch': 'assets/workouts/abs/Bicyclecrunch.gif',
  'Hanging Knee Raise': 'assets/workouts/abs/HangingKneeraise.gif',
  'Russian Twist': 'assets/workouts/abs/legraise.gif',
  'Reverse Crunch': 'assets/workouts/abs/Crunches.gif',
  'Dragon Flag': 'assets/workouts/abs/dragonfly.gif',
  'Hanging Leg Raise': 'assets/workouts/abs/HangingKneeraise.gif',
  'V Ups': 'assets/workouts/abs/plank.gif',
  'Toe to Bar': 'assets/workouts/abs/situps.gif',

  // ================= BICEPS =================
'Bicep curls': 'assets/workouts/arms/bicepcurls.gif',
'Hammer curls': 'assets/workouts/arms/hammercurls.gif',
'Concentration curls': 'assets/workouts/arms/bicepcurls.gif',
'Preacher Curl': 'assets/workouts/arms/hammercurls.gif',
'Cable Curls': 'assets/workouts/arms/bicepcurls.gif',
'Incline Dumbbell Curl': 'assets/workouts/arms/armcircles.gif',
'Barbell Curls': 'assets/workouts/arms/barbellcurl.gif',
'Chin Ups': 'assets/workouts/arms/spidercurl.gif',
'Reverse Curl': 'assets/workouts/arms/concentrationcurls.gif',
'Spider Curls': 'assets/workouts/arms/spidercurl.gif',


// ================= TRICEPS =================
'Tricep dips': 'assets/workouts/arms/tricepdips.gif',
'Close Grip Push Ups': 'assets/workouts/back/pullups.gif',
'Overhead Triceps Extension': 'assets/workouts/triceps/overheadtricepextension.gif',
'Rope pushdown': 'assets/workouts/arms/ropepushdown.gif',
'Bench dips': 'assets/workouts/arms/benchdips.gif',
'Skull Crushers': 'assets/workouts/arms/overheadtricepextension.gif',
'Diamond Push ups': 'assets/workouts/arms/pushups.gif',
'Single Arm Pushdown': 'assets/workouts/arms/ropepushdown.gif',
'Kickback': 'assets/workouts/arms/kickbacks.gif',
'Weighted dips': 'assets/workouts/arms/weighteddips.gif',

// ================= FOREARMS =================
// ================= FOREARMS =================
'Wrist Curl': 'assets/workouts/forearms/wristroller.gif',
'Reverse Wrist Curl': 'assets/workouts/forearms/wristroller.gif',
'Farmer Walk': 'assets/workouts/forearms/farmerwalk.gif',
'Dead Hang': 'assets/workouts/forearms/farmerwalk.gif',
'Plate Pinch': 'assets/workouts/forearms/wristroller.gif',
'Grip Squeeze': 'assets/workouts/forearms/farmerwalk.gif',
'Towel Pull Up': 'assets/workouts/forearms/behindbackcurl.gif',
'Behind Back Curl': 'assets/workouts/forearms/behindbackcurl.gif',
'Finger Curl': 'assets/workouts/forearms/wristroller.gif',
'Wrist Roller': 'assets/workouts/forearms/wristroller.gif',

// ================= QUADS =================
'Goblet Squat': 'assets/workouts/quads/GobletSquat.gif',
'Leg Extension': 'assets/workouts/quads/GobletSquat.gif',
'Front Squat': 'assets/workouts/quads/GobletSquat.gif',
'Hack Squat': 'assets/workouts/quads/stepdown.gif',
'Split Squat': 'assets/workouts/quads/walkinglunges.gif',
'Wall Squat': 'assets/workouts/quads/GobletSquat.gif',
'Walking Lunges': 'assets/workouts/quads/walkinglunges.gif',
'Box Jump': 'assets/workouts/quads/stepdown.gif',
'Sissy Squat': 'assets/workouts/quads/GobletSquat.gif',
'Step Down': 'assets/workouts/quads/stepdown.gif',

// ================= HAMSTRINGS =================
'Romanian Deadlift': 'assets/workouts/hamstrings/gm.gif',
'Hamstring Curl': 'assets/workouts/hamstrings/gm.gif',
'Good Morning': 'assets/workouts/hamstrings/gm.gif',
'Single Leg Deadlift': 'assets/workouts/hamstrings/kettlebellswing.gif',
'Nordic Curl': 'assets/workouts/hamstrings/gm.gif',
'Kettlebell Swing': 'assets/workouts/hamstrings/kettlebellswing.gif',
'Glute Ham Raise': 'assets/workouts/hamstrings/gm.gif',
'Cable Pull Through': 'assets/workouts/hamstrings/Cable-Pull-Through.gif',
'Bridge Walkout': 'assets/workouts/hamstrings/gm.gif',
'Stability Ball Curl': 'assets/workouts/hamstrings/kettlebellswing.gif',

// ================= CALVES =================
'Standing Calf Raise': 'assets/workouts/calves/standingcalfraise.gif',
'Seated Calf Raise': 'assets/workouts/calves/standingcalfraise.gif',
'Jump Rope': 'assets/workouts/calves/Skip-Jump-Rope.gif',
'Box Jump Calf': 'assets/workouts/calves/explohops.gif',
'Single Leg Raise': 'assets/workouts/calves/standingcalfraise.gif',
'Farmer Walk Toes': 'assets/workouts/calves/explohops.gif',
'Donkey Calf Raise': 'assets/workouts/calves/Donkey-Calf-Raise.gif',
'Toe Walk': 'assets/workouts/calves/Skip-Jump-Rope.gif',
'Calf Press': 'assets/workouts/calves/standingcalfraise.gif',
'Explosive Hops': 'assets/workouts/calves/explohops.gif',
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

// ================= ARMS WORKOUT =================
Arms: {
  Beginner: [
    { name: 'Arm Circles', reps: 20, time: 30 },
    { name: 'Push Ups', reps: 10, time: 30 },
    { name: 'Hammer Curls', reps: 12, time: 30 },
    { name: 'Tricep Dips', reps: 10, time: 30 },
    { name: 'Bicep Curls', reps: 12, time: 30 }
  ],

  Moderate: [
    { name: 'Diamond Push Ups', reps: 12, time: 35 },
    { name: 'Concentration Curls', reps: 10, time: 35 },
    { name: 'Bench Dips', reps: 15, time: 35 },
    { name: 'Barbell Curl', reps: 12, time: 35 },
    { name: 'Overhead Tricep Extension', reps: 12, time: 35 }
  ],

  Advanced: [
    { name: 'Cable Curl', reps: 15, time: 40 },
    { name: 'Rope Pushdown', reps: 15, time: 40 },
    { name: 'Spider Curl', reps: 12, time: 40 },
    { name: 'Kickbacks', reps: 15, time: 35 },
    { name: 'Weighted Dips', reps: 12, time: 40 }
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
  },
  // ================= BICEPS =================
Biceps: {
  Beginner: [
    { name: 'Bicep Curls', reps: 12, time: 30 },
    { name: 'Hammer Curls', reps: 10, time: 30 },
    { name: 'Concentration Curls', reps: 10, time: 30 },
    { name: 'Preacher Curl', reps: 10, time: 30 },
    { name: 'Cable Curl', reps: 12, time: 30 }
  ],

  Moderate: [
    { name: 'Incline Dumbbell Curl', reps: 12, time: 35 },
    { name: 'Barbell Curl', reps: 10, time: 35 },
    { name: 'Hammer Curls', reps: 12, time: 30 },
    { name: 'Reverse Curl', reps: 10, time: 30 },
    { name: 'Spider Curl', reps: 10, time: 35 }
  ],

  Advanced: [
    { name: 'Chin Ups', reps: 10, time: 40 },
    { name: 'Barbell Curl', reps: 12, time: 40 },
    { name: 'Spider Curl', reps: 12, time: 35 },
    { name: 'Cable Curl', reps: 15, time: 35 },
    { name: 'Incline Dumbbell Curl', reps: 12, time: 40 }
  ]
},

// ================= TRICEPS =================
Triceps: {
  Beginner: [
    { name: 'Tricep Dips', reps: 10, time: 30 },
    { name: 'Close Grip Push Ups', reps: 10, time: 30 },
    { name: 'Bench Dips', reps: 12, time: 30 },
    { name: 'Kickbacks', reps: 10, time: 30 },
    { name: 'Rope Pushdown', reps: 12, time: 30 }
  ],

  Moderate: [
    { name: 'Overhead Tricep Extension', reps: 12, time: 35 },
    { name: 'Skull Crushers', reps: 10, time: 35 },
    { name: 'Diamond Push Ups', reps: 12, time: 30 },
    { name: 'Single Arm Pushdown', reps: 10, time: 35 },
    { name: 'Bench Dips', reps: 15, time: 30 }
  ],

  Advanced: [
    { name: 'Weighted Dips', reps: 10, time: 40 },
    { name: 'Skull Crushers', reps: 12, time: 40 },
    { name: 'Diamond Push Ups', reps: 15, time: 35 },
    { name: 'Overhead Tricep Extension', reps: 12, time: 40 },
    { name: 'Rope Pushdown', reps: 15, time: 35 }
  ]
},

// ================= FOREARMS =================
Forearms: {
  Beginner: [
    { name: 'Wrist Curl', reps: 15, time: 30 },
    { name: 'Reverse Wrist Curl', reps: 12, time: 30 },
    { name: 'Grip Squeeze', reps: 15, time: 30 },
    { name: 'Finger Curl', reps: 12, time: 30 },
    { name: 'Dead Hang', reps: 1, time: 30 }
  ],

  Moderate: [
    { name: 'Farmer Walk', reps: 12, time: 35 },
    { name: 'Towel Pull Up', reps: 10, time: 35 },
    { name: 'Behind Back Curl', reps: 12, time: 35 },
    { name: 'Wrist Roller', reps: 10, time: 35 },
    { name: 'Plate Pinch', reps: 1, time: 40 }
  ],

  Advanced: [
    { name: 'Farmer Walk', reps: 15, time: 40 },
    { name: 'Towel Pull Up', reps: 12, time: 40 },
    { name: 'Wrist Roller', reps: 12, time: 40 },
    { name: 'Dead Hang', reps: 1, time: 60 },
    { name: 'Grip Squeeze', reps: 20, time: 35 }
  ]
},

// ================= QUADS =================
Quads: {
  Beginner: [
    { name: 'Goblet Squat', reps: 12, time: 30 },
    { name: 'Wall Squat', reps: 1, time: 30 },
    { name: 'Step Down', reps: 10, time: 30 },
    { name: 'Walking Lunges', reps: 12, time: 30 },
    { name: 'Leg Extension', reps: 12, time: 30 }
  ],

  Moderate: [
    { name: 'Front Squat', reps: 12, time: 35 },
    { name: 'Hack Squat', reps: 10, time: 35 },
    { name: 'Split Squat', reps: 12, time: 35 },
    { name: 'Box Jump', reps: 12, time: 30 },
    { name: 'Goblet Squat', reps: 15, time: 35 }
  ],

  Advanced: [
    { name: 'Front Squat', reps: 15, time: 40 },
    { name: 'Hack Squat', reps: 12, time: 40 },
    { name: 'Sissy Squat', reps: 12, time: 35 },
    { name: 'Box Jump', reps: 15, time: 35 },
    { name: 'Walking Lunges', reps: 20, time: 40 }
  ]
},

// ================= HAMSTRINGS =================
Hamstrings: {
  Beginner: [
    { name: 'Hamstring Curl', reps: 12, time: 30 },
    { name: 'Bridge Walkout', reps: 10, time: 30 },
    { name: 'Good Morning', reps: 10, time: 30 },
    { name: 'Stability Ball Curl', reps: 12, time: 30 },
    { name: 'Kettlebell Swing', reps: 12, time: 30 }
  ],

  Moderate: [
    { name: 'Romanian Deadlift', reps: 12, time: 35 },
    { name: 'Single Leg Deadlift', reps: 10, time: 35 },
    { name: 'Cable Pull Through', reps: 12, time: 35 },
    { name: 'Nordic Curl', reps: 8, time: 35 },
    { name: 'Glute Ham Raise', reps: 10, time: 35 }
  ],

  Advanced: [
    { name: 'Romanian Deadlift', reps: 15, time: 40 },
    { name: 'Nordic Curl', reps: 10, time: 40 },
    { name: 'Single Leg Deadlift', reps: 12, time: 40 },
    { name: 'Glute Ham Raise', reps: 12, time: 40 },
    { name: 'Cable Pull Through', reps: 15, time: 35 }
  ]
},

// ================= CALVES =================
Calves: {
  Beginner: [
    { name: 'Standing Calf Raise', reps: 15, time: 30 },
    { name: 'Seated Calf Raise', reps: 15, time: 30 },
    { name: 'Toe Walk', reps: 12, time: 30 },
    { name: 'Single Leg Raise', reps: 10, time: 30 },
    { name: 'Jump Rope', reps: 1, time: 30 }
  ],

  Moderate: [
    { name: 'Calf Press', reps: 15, time: 35 },
    { name: 'Donkey Calf Raise', reps: 12, time: 35 },
    { name: 'Farmer Walk Toes', reps: 12, time: 35 },
    { name: 'Box Jump Calf', reps: 12, time: 35 },
    { name: 'Standing Calf Raise', reps: 20, time: 35 }
  ],

  Advanced: [
    { name: 'Explosive Hops', reps: 20, time: 40 },
    { name: 'Calf Press', reps: 20, time: 40 },
    { name: 'Donkey Calf Raise', reps: 15, time: 40 },
    { name: 'Jump Rope', reps: 1, time: 60 },
    { name: 'Single Leg Raise', reps: 15, time: 35 }
  ]
},
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