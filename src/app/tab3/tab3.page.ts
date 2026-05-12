// src/app/tab3/tab3.page.ts

import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FitnessService } from '../services/fitness';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

@Component({
  selector: 'app-tab3',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss']
})

export class Tab3Page implements OnInit {

  // =========================
  // USER INPUT
  // =========================

  userQuestion = '';

  // =========================
  // CHAT STORAGE
  // =========================

  chatMessages: any[] = [];

  // =========================
  // QUICK QUESTIONS
  // =========================

  quickQuestions = [
    'Meals',
    'Veg Meal',
    'Non Veg Meal',
    'Workout',
    'Calories',
    'Motivation',
    'Weight Loss',
    'Muscle Gain',
    'Protein',
    'BMI',
    'Water Intake',
    'Sleep',
    'Yoga',
    'Supplements',
    'Walking',
    'Beginner Gym'
  ];

  constructor(
    public fitness: FitnessService
  ) {}

  

  // =========================
  // PAGE LOAD
  // =========================

  ngOnInit() {

    this.chatMessages.push({
      sender: 'bot',
      text: `Welcome to FitnessGPT 👋

Your Personal Fitness Assistant 💪

Ask me about:

• Diet
• Workouts
• Calories
• Weight Loss
• Muscle Gain
• Protein
• Yoga
• BMI
• Motivation
• Supplements`
    });

  }

  // =========================
  // QUICK QUESTION CLICK
  // =========================

  selectQuickQuestion(question: string) {

    this.userQuestion = question;

    this.sendMessage();
  }

  // =========================
  // MAIN CHAT FUNCTION
  // =========================

  sendMessage() {

    const question = this.userQuestion.trim();

    if (!question) return;

    // USER MESSAGE
    this.chatMessages.push({
      sender: 'user',
      text: question
    });

    const q = question.toLowerCase();

    let response = '';

    // =================================================
    // NON VEG MEAL
    // =================================================

    if (
      q.includes('non veg') ||
      q.includes('nonveg') ||
      q.includes('chicken') ||
      q.includes('egg') ||
      q.includes('fish') ||
      q.includes('muscle gain diet')
    ) {

      response = `🍗 NON-VEG HIGH PROTEIN DIET PLAN

🔥 Breakfast
4 Eggs
Brown Bread
Milk
Banana

🔥 Lunch
Chicken Breast
Rice
Salad

🔥 Dinner
Fish / Chicken
Vegetables

💪 Best for muscle gain`;

    }

    // =================================================
    // VEG MEAL
    // =================================================

    else if (
      q.includes('veg') ||
      q.includes('vegetarian') ||
      q.includes('paneer') ||
      q.includes('tofu')
    ) {

      response = `🥦 VEG HIGH PROTEIN DIET

🔥 Breakfast
Oats + Milk

🔥 Lunch
Rice + Dal + Paneer

🔥 Dinner
Roti + Sabzi + Curd

💪 Best Veg Protein Sources

Paneer
Tofu
Milk
Dal
Rajma
Soya`;

    }

    // =================================================
    // GENERAL MEALS
    // =================================================

    else if (
      q.includes('meal') ||
      q.includes('diet') ||
      q.includes('food') ||
      q.includes('breakfast')
    ) {

      response = `🍽 SMART DAILY MEAL PLAN

Breakfast
Oats + Banana

Lunch
Rice + Dal + Paneer

Evening
Fruit + Nuts

Dinner
Roti + Sabzi + Curd

⚡ Balanced Diet`;

    }

    // =================================================
    // WORKOUT
    // =================================================

    else if (
      q.includes('workout') ||
      q.includes('exercise') ||
      q.includes('gym') ||
      q.includes('cardio')
    ) {

      response = `🏋️ WEEKLY WORKOUT PLAN

Monday → Chest

Tuesday → Back

Wednesday → Legs

Thursday → Shoulders

Friday → Arms

Saturday → Abs + Cardio

Sunday → Rest`;

    }

    // =================================================
    // CALORIES
    // =================================================

    else if (
      q.includes('calorie') ||
      q.includes('rice') ||
      q.includes('pizza') ||
      q.includes('burger')
    ) {

      response = `🔥 CALORIES GUIDE

🍚 Rice → 200 cal

🫓 Roti → 100 cal

🍌 Banana → 90 cal

🍕 Pizza → 300 cal

🍔 Burger → 350 cal

🥚 Egg → 70 cal`;

    }

    // =================================================
    // MOTIVATION
    // =================================================

    else if (
      q.includes('motivation') ||
      q.includes('lazy') ||
      q.includes('discipline')
    ) {

      response = `🚀 MOTIVATION

Discipline beats motivation

Never skip twice

Progress > Perfection

Consistency creates results 💪`;

    }

    // =================================================
    // WEIGHT LOSS
    // =================================================

    else if (
      q.includes('weight loss') ||
      q.includes('lose weight') ||
      q.includes('fat loss') ||
      q.includes('belly fat')
    ) {

      response = `🔥 WEIGHT LOSS TIPS

✅ Calorie Deficit
✅ Cardio
✅ Walking
✅ High Protein
✅ Drink Water

🏃 Best Exercises

Running
Jump Rope
Cycling
HIIT`;

    }

    // =================================================
    // MUSCLE GAIN
    // =================================================

    else if (
      q.includes('muscle gain') ||
      q.includes('bulk') ||
      q.includes('build muscle')
    ) {

      response = `💪 MUSCLE GAIN GUIDE

✅ High Protein
✅ Strength Training
✅ Good Sleep
✅ Progressive Overload

🍗 Protein Foods

Eggs
Chicken
Paneer
Fish
Milk`;

    }

    // =================================================
    // PROTEIN
    // =================================================

    else if (
      q.includes('protein')
    ) {

      response = `🥚 HIGH PROTEIN FOODS

Eggs
Chicken
Paneer
Tofu
Fish
Milk
Greek Yogurt
Soya Chunks

💪 Protein helps muscle recovery`;

    }

    // =================================================
    // WATER
    // =================================================

    else if (
      q.includes('water') ||
      q.includes('hydration')
    ) {

      response = `💧 WATER INTAKE

Men → 3-4 Litres

Women → 2-3 Litres

Benefits:

Healthy Skin
Fat Loss
Better Recovery
Energy`;

    }

    // =================================================
    // BMI
    // =================================================

    else if (
      q.includes('bmi')
    ) {

      response = `📏 BMI GUIDE

Underweight → Below 18.5

Normal → 18.5 - 24.9

Overweight → 25+

⚡ Healthy lifestyle matters most`;

    }

    // =================================================
    // SLEEP
    // =================================================

    else if (
      q.includes('sleep') ||
      q.includes('recovery')
    ) {

      response = `😴 SLEEP GUIDE

Adults need 7-9 hours sleep

Benefits:

Muscle Recovery
Fat Loss
Energy
Mental Health`;

    }

    // =================================================
    // SUPPLEMENTS
    // =================================================

    else if (
      q.includes('supplement') ||
      q.includes('creatine') ||
      q.includes('whey')
    ) {

      response = `💊 FITNESS SUPPLEMENTS

✅ Whey Protein

✅ Creatine

✅ Pre Workout

⚠️ Supplements help only with good diet`;

    }

    // =================================================
    // YOGA
    // =================================================

    else if (
      q.includes('yoga') ||
      q.includes('stretching')
    ) {

      response = `🧘 YOGA BENEFITS

Better flexibility

Stress relief

Posture improvement

🔥 Best Poses

Cobra Pose
Child Pose
Mountain Pose`;

    }

    // =================================================
    // WALKING
    // =================================================

    else if (
      q.includes('walking') ||
      q.includes('steps')
    ) {

      response = `👣 DAILY STEP GUIDE

Beginner → 5000 Steps

Active → 8000 Steps

Fitness Goal → 10000+ Steps`;

    }

    // =================================================
    // BEGINNER GYM
    // =================================================

    else if (
      q.includes('beginner')
    ) {

      response = `🏋️ BEGINNER GYM TIPS

✅ Learn form first

✅ Start light

✅ Focus on consistency

🔥 Beginner Exercises

Pushups
Squats
Walking`;

    }

    // =================================================
    // RECIPE
    // =================================================

    else if (
      q.includes('recipe') ||
      q.includes('how to make')
    ) {

      response = `👨‍🍳 HEALTHY RECIPE

Paneer Protein Bowl

Ingredients:
Paneer
Rice
Vegetables
Curd

Simple + High Protein 💪`;

    }

    // =================================================
    // FALLBACK
    // =================================================

    else {

      response = `🤖 I can help with:

• Meals
• Workouts
• Weight Loss
• Calories
• Protein
• BMI
• Yoga
• Motivation
• Supplements

Try asking:

"Give me muscle gain diet"

"Calories in rice"

"Workout for belly fat"

"Protein foods"

"Motivate me" 💪`;

    }

    // BOT RESPONSE
    this.chatMessages.push({
      sender: 'bot',
      text: response
    });

    // CLEAR INPUT
    this.userQuestion = '';

  }

}