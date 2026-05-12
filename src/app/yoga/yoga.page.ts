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
    PCOD: 'assets/yoga/pcod.gif',
    Sleep: 'assets/yoga/sleep.gif',
    'Stress Relief': 'assets/yoga/stress.gif',
    'Weight Loss': 'assets/yoga/weightloss.gif',
    'Back Pain': 'assets/yoga/backpain.gif',
    Flexibility: 'assets/yoga/flexibility.gif',
    Anxiety: 'assets/yoga/anxiety.gif',
    Meditation: 'assets/yoga/meditation.gif'
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

    PCOD: {
      Beginner: [
        { name: 'Butterfly Pose', breaths: 10, time: 30 },
        { name: 'Cobra Pose', breaths: 10, time: 30 },
        { name: 'Cat Cow Pose', breaths: 10, time: 30 },
        { name: 'Child Pose', breaths: 10, time: 30 },
        { name: 'Bridge Pose', breaths: 10, time: 30 }
      ],

      Moderate: [
        { name: 'Butterfly Pose', breaths: 15, time: 40 },
        { name: 'Bridge Pose', breaths: 15, time: 40 },
        { name: 'Cobra Pose', breaths: 15, time: 40 },
        { name: 'Cat Cow Pose', breaths: 15, time: 40 },
        { name: 'Child Pose', breaths: 15, time: 40 }
      ],

      Advanced: [
        { name: 'Bridge Pose', breaths: 20, time: 50 },
        { name: 'Butterfly Pose', breaths: 20, time: 50 },
        { name: 'Cobra Pose', breaths: 20, time: 50 },
        { name: 'Child Pose', breaths: 20, time: 50 },
        { name: 'Cat Cow Pose', breaths: 20, time: 50 }
      ]
    },

    Sleep: {
      Beginner: [
        { name: 'Legs Up Wall', breaths: 10, time: 30 },
        { name: 'Corpse Pose', breaths: 10, time: 40 },
        { name: 'Happy Baby Pose', breaths: 10, time: 30 },
        { name: 'Forward Fold', breaths: 10, time: 30 },
        { name: 'Supine Twist', breaths: 10, time: 30 }
      ],

      Moderate: [
        { name: 'Corpse Pose', breaths: 15, time: 45 },
        { name: 'Legs Up Wall', breaths: 15, time: 45 },
        { name: 'Forward Fold', breaths: 15, time: 40 },
        { name: 'Supine Twist', breaths: 15, time: 40 },
        { name: 'Happy Baby Pose', breaths: 15, time: 40 }
      ],

      Advanced: [
        { name: 'Corpse Pose', breaths: 20, time: 60 },
        { name: 'Legs Up Wall', breaths: 20, time: 60 },
        { name: 'Supine Twist', breaths: 20, time: 50 },
        { name: 'Forward Fold', breaths: 20, time: 50 },
        { name: 'Happy Baby Pose', breaths: 20, time: 50 }
      ]
    },

    'Stress Relief': {
      Beginner: [
        { name: 'Lotus Pose', breaths: 10, time: 30 },
        { name: 'Tree Pose', breaths: 10, time: 30 },
        { name: 'Mountain Pose', breaths: 10, time: 30 },
        { name: 'Easy Pose', breaths: 10, time: 30 },
        { name: 'Child Pose', breaths: 10, time: 30 }
      ],

      Moderate: [
        { name: 'Tree Pose', breaths: 15, time: 40 },
        { name: 'Lotus Pose', breaths: 15, time: 40 },
        { name: 'Seated Forward Bend', breaths: 15, time: 40 },
        { name: 'Mountain Pose', breaths: 15, time: 40 },
        { name: 'Easy Pose', breaths: 15, time: 40 }
      ],

      Advanced: [
        { name: 'Lotus Pose', breaths: 20, time: 50 },
        { name: 'Tree Pose', breaths: 20, time: 50 },
        { name: 'Seated Forward Bend', breaths: 20, time: 50 },
        { name: 'Mountain Pose', breaths: 20, time: 50 },
        { name: 'Easy Pose', breaths: 20, time: 50 }
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