import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FitnessService } from '../services/fitness';

@Component({
  selector: 'app-yoga',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './yoga.page.html',
  styleUrls: ['./yoga.page.scss']
})
export class YogaPage implements OnInit {

  constructor(public fitness: FitnessService) {}

  // ================= STATE =================
  selectedCategory: string = 'PCOD';
  selectedLevel: string = 'Beginner';
  todayYogaText: string = '';

  levels = ['Beginner', 'Moderate', 'Advanced'];

  isYogaMode = false;
  currentAsanaIndex = 0;
  timeLeft = 30;
  breaths = 10;
  yogaTimer: any;

  completedAsanas = 0;
  totalAsanas = 0;

  // ================= YOGA CATEGORIES =================
  categories = [
    { name: 'PCOD', emoji: '🌸' },
    { name: 'Sleep', emoji: '😴' },
    { name: 'Stress Relief', emoji: '🧘' },
    { name: 'Weight Loss', emoji: '🔥' },
    { name: 'Back Pain', emoji: '💆' },
    { name: 'Flexibility', emoji: '🤸' },
    { name: 'Anxiety', emoji: '🌿' },
    { name: 'Meditation', emoji: '☮️' }
  ];

  filteredCategories: any[] = [];

  // ================= DAILY YOGA =================
  getTodayYoga() {
    const day = new Date().getDay();

    const plan: any = {
      0: { text: '🌿 Meditation Day', parts: ['Meditation'] },
      1: { text: '🌸 PCOD Healing', parts: ['PCOD'] },
      2: { text: '😴 Better Sleep', parts: ['Sleep'] },
      3: { text: '🧘 Stress Relief', parts: ['Stress Relief'] },
      4: { text: '🔥 Fat Burn Yoga', parts: ['Weight Loss'] },
      5: { text: '💆 Back Pain Relief', parts: ['Back Pain'] },
      6: { text: '🤸 Full Body Flexibility', parts: ['Flexibility'] }
    };

    const today = plan[day];
    this.todayYogaText = today.text;

    this.filteredCategories = this.categories.filter(c =>
      today.parts.includes(c.name)
    );
  }

  // ================= CATEGORY GIFS =================
  categoryGifs: any = {
    'PCOD': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiUTqBYizqW7GTPyjep0JupxSJPZ-6qxkXmA&s',
    'Sleep': 'https://img.favpng.com/25/17/23/sleep-cartoon-animation-clip-art-png-favpng-vY1ZQcWy8grZ73FFc1NcFpunT.jpg',
    'Stress Relief': 'https://static.vecteezy.com/system/resources/previews/042/113/887/non_2x/meditating-girl-female-becalmed-character-in-yoga-lotus-posture-stress-relief-and-meditation-practice-flat-illustration-set-healthy-lifestyle-meditation-cartoon-concept-vector.jpg',
    'Weight Loss': 'https://img.freepik.com/premium-vector/vector-illustration-weight-loss-cartoon-scene-with-girl-who-lost-weight-fruits-salads-water-white-background_812561-661.jpg',
    'Back Pain': 'https://www.shutterstock.com/shutterstock/photos/2071984802/display_1500/stock-vector-suffering-from-chronic-back-pain-concept-young-woman-standing-holding-her-lower-back-suffering-2071984802.jpg',
    'Flexibility': 'https://thumbs.dreamstime.com/b/young-attractive-woman-practicing-yoga-sitting-one-leg-king-pigeon-flexibility-stretching-exercise-yoga-king-pigeon-exercise-101756852.jpg',
    'Anxiety': 'https://thumbs.dreamstime.com/b/woman-fears-phobias-anxiety-despair-pain-anxiety-woman-fears-phobias-thoughts-get-confused-crushed-isolated-girl-203608015.jpg',
    'Meditation': 'https://static.vecteezy.com/system/resources/previews/055/337/931/non_2x/a-woman-meditates-in-nature-and-leaves-conceptual-illustration-for-yoga-meditation-relaxation-rest-healthy-lifestyle-illustration-in-flat-artoon-vector.jpg'
  };

  // ================= ASANA GIFS =================
  asanaGifs: any = {

    // ================= PCOD =================
    'Butterfly Pose': 'assets/yoga/butterfly.gif',
    'Cobra Pose': 'assets/yoga/cobra.gif',
    'Cat Cow Pose': 'assets/yoga/catcow.gif',
    'Child Pose': 'assets/yoga/childpose.gif',
    'Bridge Pose': 'assets/yoga/bridgepose.gif',

    // ================= SLEEP =================
    'Legs Up Wall': 'assets/yoga/legsupwall.gif',
    'Corpse Pose': 'assets/yoga/corpsepose.gif',
    'Happy Baby Pose': 'assets/yoga/happybaby.gif',
    'Forward Fold': 'assets/yoga/forwardfold.gif',
    'Supine Twist': 'assets/yoga/supinetwist.gif',

    // ================= STRESS =================
    'Lotus Pose': 'assets/yoga/lotuspose.gif',
    'Tree Pose': 'assets/yoga/treepose.gif',
    'Seated Forward Bend': 'assets/yoga/seatedforwardbend.gif',
    'Mountain Pose': 'assets/yoga/mountainpose.gif',
    'Easy Pose': 'assets/yoga/easypose.gif',

    // ================= WEIGHT LOSS =================
    'Boat Pose': 'assets/yoga/boatpose.gif',
    'Plank Pose': 'assets/yoga/plankpose.gif',
    'Warrior Pose': 'assets/yoga/warriorpose.gif',
    'Chair Pose': 'assets/yoga/chairpose.gif',
    'Bow Pose': 'assets/yoga/bowpose.gif',

    // ================= BACK PAIN =================
    'Sphinx Pose': 'assets/yoga/sphinxpose.gif',
    'Downward Dog': 'assets/yoga/downwarddog.gif',
    'Thread Needle Pose': 'assets/yoga/threadneedle.gif',
    'Puppy Pose': 'assets/yoga/puppypose.gif',
    'Triangle Pose': 'assets/yoga/trianglepose.gif',

    // ================= FLEXIBILITY =================
    'Camel Pose': 'assets/yoga/camelpose.gif',
    'Split Stretch': 'assets/yoga/splitstretch.gif',
    'Wide Leg Fold': 'assets/yoga/widelegfold.gif',
    'Lizard Pose': 'assets/yoga/lizardpose.gif',
    'King Pigeon Pose': 'assets/yoga/pigeonpose.gif',

    // ================= ANXIETY =================
    'Breathing Pose': 'assets/yoga/breathingpose.gif',
    'Moon Pose': 'assets/yoga/moonpose.gif',
    'Garland Pose': 'assets/yoga/garlandpose.gif',
    'Fish Pose': 'assets/yoga/fishpose.gif',
    'Standing Forward Fold': 'assets/yoga/forwardfold.gif',

    // ================= MEDITATION =================
    'Zen Pose': 'assets/yoga/zenpose.gif',
    'Pranayama': 'assets/yoga/pranayama.gif',
    'Alternate Nostril Breathing': 'assets/yoga/breathingpose.gif',
    'Mindfulness Pose': 'assets/yoga/mindfulness.gif',
    'Deep Relaxation': 'assets/yoga/deeprelaxation.gif'
  };

  onGifError(event: any) {
    event.target.src =
      'https://cdn-icons-png.flaticon.com/512/1048/1048941.png';
  }

  // ================= YOGA WORKOUTS =================
  yogaExercises: any = {

   

  // ================= PCOD =================
  PCOD: {
    Beginner: [
      {
        name: 'Butterfly Pose',
        breaths: 10,
        time: 40,
        desc: 'Helps improve pelvic blood flow and reduces menstrual discomfort.'
      },
      {
        name: 'Cat Cow Pose',
        breaths: 10,
        time: 45,
        desc: 'Improves spine flexibility and regulates hormonal balance.'
      },
      {
        name: 'Cobra Pose',
        breaths: 8,
        time: 40,
        desc: 'Strengthens reproductive organs and reduces stress in abdomen.'
      },
      {
        name: 'Child Pose',
        breaths: 10,
        time: 50,
        desc: 'Relaxes the nervous system and reduces fatigue.'
      },
      {
        name: 'Bridge Pose',
        breaths: 8,
        time: 45,
        desc: 'Stimulates thyroid and improves hormonal activity.'
      }
    ],

    Moderate: [
      {
        name: 'Butterfly Pose (Deep Hold)',
        breaths: 15,
        time: 60,
        desc: 'Improves hip flexibility and hormonal regulation.'
      },
      {
        name: 'Bridge Pose',
        breaths: 15,
        time: 60,
        desc: 'Enhances pelvic circulation and reduces PCOD symptoms.'
      },
      {
        name: 'Cobra Pose',
        breaths: 12,
        time: 55,
        desc: 'Boosts metabolism and relieves lower back stiffness.'
      },
      {
        name: 'Seated Forward Bend',
        breaths: 12,
        time: 60,
        desc: 'Calms mind and improves digestion.'
      },
      {
        name: 'Cat Cow Flow',
        breaths: 15,
        time: 60,
        desc: 'Balances hormones and improves spinal movement.'
      }
    ],

    Advanced: [
      {
        name: 'Bridge Pose Hold',
        breaths: 20,
        time: 75,
        desc: 'Deep hormonal stimulation and pelvic strengthening.'
      },
      {
        name: 'Cobra Flow',
        breaths: 20,
        time: 70,
        desc: 'Improves energy flow and reduces stress hormones.'
      },
      {
        name: 'Butterfly Pulse',
        breaths: 20,
        time: 70,
        desc: 'Advanced hip opening for reproductive health.'
      },
      {
        name: 'Child Pose Deep Relax',
        breaths: 20,
        time: 80,
        desc: 'Deep nervous system reset and emotional balance.'
      },
      {
        name: 'Cat Cow Extended Flow',
        breaths: 20,
        time: 75,
        desc: 'Improves spine mobility and hormone balance.'
      }
    ]
  },

  // ================= SLEEP =================
  Sleep: {
    Beginner: [
      {
        name: 'Legs Up Wall',
        breaths: 8,
        time: 60,
        desc: 'Improves blood circulation and relaxes nervous system.'
      },
      {
        name: 'Corpse Pose',
        breaths: 10,
        time: 90,
        desc: 'Deep relaxation for mental calmness and sleep.'
      },
      {
        name: 'Happy Baby Pose',
        breaths: 10,
        time: 60,
        desc: 'Releases lower back tension and stress.'
      },
      {
        name: 'Forward Fold',
        breaths: 8,
        time: 60,
        desc: 'Calms brain and reduces anxiety.'
      },
      {
        name: 'Supine Twist',
        breaths: 8,
        time: 60,
        desc: 'Releases spinal tension and aids digestion.'
      }
    ],

    Moderate: [
      {
        name: 'Corpse Pose Deep',
        breaths: 15,
        time: 120,
        desc: 'Deep meditation posture for insomnia relief.'
      },
      {
        name: 'Legs Up Wall Hold',
        breaths: 15,
        time: 90,
        desc: 'Reduces fatigue and improves sleep quality.'
      },
      {
        name: 'Supine Twist Hold',
        breaths: 12,
        time: 80,
        desc: 'Relieves tension before sleep.'
      },
      {
        name: 'Forward Fold Relax',
        breaths: 15,
        time: 80,
        desc: 'Improves oxygen flow to brain.'
      },
      {
        name: 'Happy Baby Relax',
        breaths: 12,
        time: 70,
        desc: 'Releases emotional stress from hips.'
      }
    ],

    Advanced: [
      {
        name: 'Yoga Nidra',
        breaths: 25,
        time: 180,
        desc: 'Deep sleep meditation technique.'
      },
      {
        name: 'Corpse Pose Extended',
        breaths: 20,
        time: 150,
        desc: 'Full body relaxation for deep sleep.'
      },
      {
        name: 'Legs Up Wall Advanced',
        breaths: 20,
        time: 120,
        desc: 'Boosts recovery and sleep hormone balance.'
      },
      {
        name: 'Supine Twist Deep',
        breaths: 20,
        time: 100,
        desc: 'Deep spinal relaxation before sleep.'
      },
      {
        name: 'Breathing Savasana',
        breaths: 20,
        time: 120,
        desc: 'Breath control for mental shutdown.'
      }
    ]
  },

  // ================= STRESS RELIEF =================
  'Stress Relief': {
    Beginner: [
      {
        name: 'Mountain Pose',
        breaths: 10,
        time: 40,
        desc: 'Improves posture and mental stability.'
      },
      {
        name: 'Child Pose',
        breaths: 10,
        time: 50,
        desc: 'Calms nervous system instantly.'
      },
      {
        name: 'Tree Pose',
        breaths: 8,
        time: 45,
        desc: 'Improves focus and balance.'
      },
      {
        name: 'Easy Pose',
        breaths: 10,
        time: 40,
        desc: 'Basic meditation posture for calmness.'
      },
      {
        name: 'Lotus Prep Pose',
        breaths: 10,
        time: 45,
        desc: 'Prepares mind for meditation.'
      }
    ],

    Moderate: [
      {
        name: 'Tree Pose Balance',
        breaths: 12,
        time: 60,
        desc: 'Improves concentration and mental control.'
      },
      {
        name: 'Seated Forward Bend',
        breaths: 12,
        time: 60,
        desc: 'Reduces stress and anxiety.'
      },
      {
        name: 'Lotus Pose',
        breaths: 15,
        time: 70,
        desc: 'Deep meditation posture for inner peace.'
      },
      {
        name: 'Mountain Flow',
        breaths: 12,
        time: 60,
        desc: 'Grounding posture for stability.'
      },
      {
        name: 'Child Pose Relax',
        breaths: 12,
        time: 60,
        desc: 'Releases emotional stress.'
      }
    ],

    Advanced: [
      {
        name: 'Lotus Meditation',
        breaths: 20,
        time: 120,
        desc: 'Deep meditative state for stress release.'
      },
      {
        name: 'Tree Pose Hold',
        breaths: 20,
        time: 90,
        desc: 'Advanced balance and focus training.'
      },
      {
        name: 'Seated Forward Bend Deep',
        breaths: 18,
        time: 100,
        desc: 'Deep emotional and physical release.'
      },
      {
        name: 'Mountain Stillness',
        breaths: 20,
        time: 90,
        desc: 'Mental grounding and stability.'
      },
      {
        name: 'Zen Sitting Pose',
        breaths: 20,
        time: 120,
        desc: 'Deep awareness and mindfulness practice.'
      }
    ]
  },

  // ================= NEW CATEGORY: WEIGHT LOSS YOGA =================
  'Weight Loss Yoga': {
    Beginner: [
      { name: 'Sun Salutation A', breaths: 10, time: 60, desc: 'Full body warm-up and fat burning flow.' },
      { name: 'Chair Pose', breaths: 10, time: 40, desc: 'Strengthens legs and burns calories.' },
      { name: 'Warrior I', breaths: 10, time: 50, desc: 'Builds stamina and core strength.' },
      { name: 'Bridge Pose', breaths: 10, time: 50, desc: 'Activates metabolism and core.' },
      { name: 'Standing Forward Bend', breaths: 10, time: 45, desc: 'Improves digestion and fat loss.' }
    ],

    Moderate: [
      { name: 'Sun Salutation Flow', breaths: 15, time: 90, desc: 'Continuous flow for calorie burn.' },
      { name: 'Warrior II', breaths: 12, time: 60, desc: 'Strengthens lower body and core.' },
      { name: 'Plank Pose', breaths: 12, time: 60, desc: 'Core strengthening for fat burn.' },
      { name: 'Boat Pose', breaths: 12, time: 60, desc: 'Targets belly fat.' },
      { name: 'Triangle Pose', breaths: 12, time: 60, desc: 'Improves digestion and metabolism.' }
    ],

    Advanced: [
      { name: 'Power Sun Flow', breaths: 20, time: 120, desc: 'High intensity yoga fat burn.' },
      { name: 'Side Plank', breaths: 15, time: 80, desc: 'Core and oblique strengthening.' },
      { name: 'Warrior Flow', breaths: 20, time: 100, desc: 'Advanced endurance training.' },
      { name: 'Boat Pose Hold', breaths: 18, time: 90, desc: 'Deep core activation.' },
      { name: 'Jumping Sun Salutation', breaths: 20, time: 120, desc: 'Cardio + yoga fusion burn.' }
    ]
  }
};

  // ================= INIT =================
  ngOnInit() {
    this.filteredCategories = this.categories;
    this.getTodayYoga();
  }

  // ================= CATEGORY =================
  openCategory(category: string) {
    this.selectedCategory = category;
  }

  changeLevel(level: string) {
    this.selectedLevel = level;
  }

  // ================= START YOGA =================
  startYoga(category: string) {

    const list = this.yogaExercises?.[category]?.[this.selectedLevel];

    if (!list || list.length === 0) return;

    this.selectedCategory = category;
    this.isYogaMode = true;
    this.currentAsanaIndex = 0;

    this.completedAsanas = 0;
    this.totalAsanas = list.length;

    this.loadAsana();
  }

  loadAsana() {

    const asana =
      this.yogaExercises[this.selectedCategory][this.selectedLevel][this.currentAsanaIndex];

    this.breaths = asana.breaths;
    this.timeLeft = asana.time;

    this.runTimer();
  }

  runTimer() {

    clearInterval(this.yogaTimer);

    this.yogaTimer = setInterval(() => {

      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.nextAsana();
      }

    }, 1000);
  }

  // ================= NEXT =================
  nextAsana() {

    this.completedAsanas++;

    const list =
      this.yogaExercises[this.selectedCategory][this.selectedLevel];

    if (this.currentAsanaIndex < list.length - 1) {

      this.currentAsanaIndex++;
      this.loadAsana();

    } else {

      this.finishYoga();
    }
  }

  // ================= PREVIOUS =================
  prevAsana() {

    if (this.currentAsanaIndex > 0) {

      this.currentAsanaIndex--;
      this.loadAsana();
    }
  }

  // ================= EXIT =================
  exitYoga() {

    this.isYogaMode = false;
    clearInterval(this.yogaTimer);
  }

  // ================= COMPLETE =================
  finishYoga() {

    this.isYogaMode = false;
    clearInterval(this.yogaTimer);

    if (this.completedAsanas >= this.totalAsanas) {

      const calories = this.totalAsanas * 10;
      const tokens = this.totalAsanas;

      this.fitness.calories += calories;
      this.fitness.tokens += tokens;

      const today = new Date().getDay();
      this.fitness.history[today] += calories;

      this.fitness.saveStats();
      this.fitness.saveHistory();

      alert(`🧘 Yoga Completed!
+${calories} Calories
+${tokens} Tokens`);
    }
  }

  // ================= RESET =================
  clearYogaData() {

    this.fitness.calories = 0;
    this.fitness.tokens = 0;
    this.fitness.history = [0,0,0,0,0,0,0];

    this.fitness.saveStats();
    this.fitness.saveHistory();

    alert('🧹 Yoga data cleared!');
  }
}