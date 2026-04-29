// src/app/tab3/tab3.page.ts

import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FitnessService } from '../services/fitness';

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
  // QUICK OPTIONS
  // =========================

  quickQuestions = [
    'Meals',
    'Veg Meal',
    'Non Veg Meal',
    'Workout',
    'Calories',
    'Motivation'
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

Your Personal Fitness Assistant

What can I help you with today?`
    });
  }

  // =========================
  // CLICKABLE QUESTIONS
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
    // NON VEG MEAL (KEEP FIRST)
    // =================================================

    if (
      q.includes('non veg') ||
      q.includes('nonveg') ||
      q.includes('non veg meal') ||
      q.includes('nonveg meal') ||
      q.includes('chicken diet') ||
      q.includes('egg diet') ||
      q.includes('fish diet') ||
      q.includes('gym diet non veg') ||
      q.includes('high protein non veg') ||
      q.includes('non veg for gym') ||
      q.includes('bulking diet') ||
      q.includes('muscle gain diet')
    ) {
      response = `🍗 NON-VEG HIGH PROTEIN DIET PLAN

🔥 Breakfast
4 Boiled Eggs
2 Brown Bread Toast
1 Glass Milk
1 Banana

🔥 Mid-Morning
Greek Yogurt
OR
Boiled Eggs

🔥 Lunch
Grilled Chicken Breast
Rice
Green Salad
Curd

🔥 Evening Snack
Boiled Eggs
Black Coffee
Fruit

🔥 Dinner
Fish / Chicken Breast
Vegetables
Soup

🔥 Before Sleep
Milk
OR
Curd

⚡ BEST FOR

Muscle Gain
Fat Loss
Gym Body
High Protein Diet

💪 BEST SOURCES

Chicken Breast
Eggs
Fish
Greek Yogurt
Milk
Curd

Would you like:
👉 Chicken Recipe
👉 Egg Recipe
👉 Fish Recipe`;
    }

    // =================================================
    // VEG MEAL
    // =================================================

    else if (
      q.includes('veg meal') ||
      q.includes('veg diet') ||
      q.includes('vegetarian') ||
      q.includes('vegetarian diet') ||
      q.includes('paneer diet') ||
      q.includes('tofu diet') ||
      q.includes('veg protein') ||
      q.includes('high protein veg')
    ) {
      response = `🥦 VEG HIGH PROTEIN DIET PLAN

🔥 Breakfast
Oats + Milk
Banana
Peanut Butter Toast

🔥 Mid-Morning
Fruits
Curd

🔥 Lunch
Rice + Dal
Paneer
Salad

🔥 Evening Snack
Roasted Chana
Nuts
Buttermilk

🔥 Dinner
Roti + Sabzi
Paneer + Curd

🔥 Before Sleep
Milk

⚡ BEST FOR

Fat Loss
Lean Muscle
Healthy Lifestyle

💪 BEST SOURCES

Paneer
Tofu
Dal
Rajma
Chole
Milk
Curd
Soya Chunks

Would you like:
👉 Paneer Recipe
👉 Tofu Recipe
👉 Dal Recipe`;
    }

    // =================================================
    // GENERAL MEALS
    // =================================================

    else if (
      q.includes('meal') ||
      q.includes('diet') ||
      q.includes('food') ||
      q.includes('breakfast') ||
      q.includes('lunch') ||
      q.includes('dinner') ||
      q.includes('meal plan')
    ) {
      response = `🍽 SMART DAILY MEAL PLAN

Breakfast
Oats + Milk + Banana

Lunch
Rice + Dal + Paneer

Evening
Fruit + Nuts

Dinner
Roti + Sabzi + Curd

Pre Workout
Banana + Coffee

Post Workout
Protein Rich Meal

Balanced for fat loss + fitness 💪`;
    }

    // =================================================
    // WORKOUT
    // =================================================

    else if (
      q.includes('workout') ||
      q.includes('exercise') ||
      q.includes('gym') ||
      q.includes('home workout') ||
      q.includes('cardio') ||
      q.includes('walking') ||
      q.includes('abs') ||
      q.includes('chest') ||
      q.includes('arms')
    ) {
      response = `🏋️ WEEKLY WORKOUT PLAN

Monday → Chest

Tuesday → Back

Wednesday → Legs

Thursday → Shoulders

Friday → Arms

Saturday → Abs + Cardio

Sunday → Rest

🏠 HOME WORKOUT

Pushups
Squats
Plank
Lunges
Jumping Jacks`;
    }

    // =================================================
    // CALORIES
    // =================================================

    else if (
      q.includes('calorie') ||
      q.includes('calories') ||
      q.includes('rice') ||
      q.includes('roti') ||
      q.includes('banana') ||
      q.includes('milk') ||
      q.includes('pizza') ||
      q.includes('burger')
    ) {
      response = `🔥 CALORIES GUIDE

Fat Loss
1600–1900 cal

Muscle Gain
2200–2800 cal

Maintenance
2000–2300 cal

🍚 Rice → 200 cal

🫓 Roti → 100 cal

🍌 Banana → 90 cal

🥛 Milk → 150 cal

🍕 Pizza → 300 cal

🍔 Burger → 350+ cal

🥚 Egg → 70 cal`;
    }

    // =================================================
    // MOTIVATION
    // =================================================

    else if (
      q.includes('motivation') ||
      q.includes('lazy') ||
      q.includes('discipline') ||
      q.includes('confidence') ||
      q.includes('not motivated')
    ) {
      response = `🚀 MOTIVATION

Discipline beats motivation

Start small

Never skip twice

Progress > Perfection

Consistency creates results

You are stronger than excuses 💪🔥`;
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
Black Pepper
Lemon

Method:
1. Lightly cook paneer
2. Add boiled rice
3. Add vegetables
4. Add pepper + lemon
5. Serve with curd

Simple + High Protein 💪`;
    }

    // =================================================
    // FALLBACK
    // =================================================

    else {
      response = `🤖 I can help with:

• Meals
• Veg Meal
• Non Veg Meal
• Workout
• Calories
• Motivation
• Recipes

Try asking:

"Give me non veg diet"

"Calories in rice"

"Workout for belly fat"

"Motivate me"

"What should I eat?" 💪`;
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