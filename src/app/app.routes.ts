import { Routes } from '@angular/router';

export const routes: Routes = [

  // 👋 Default Route
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },

  // 👋 Welcome Page
  {
    path: 'welcome',
    loadComponent: () =>
      import('./welcome/welcome.page').then(
        m => m.WelcomePage
      )
  },

  // 🔐 Login Page
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(
        m => m.HomePage
      )
  },

  // 📝 Signup Page
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.page').then(
        m => m.SignupPage
      )
  },

  // 📏 BMI Page
  {
    path: 'bmi',
    loadComponent: () =>
      import('./bmi/bmi.page').then(
        m => m.BmiPage
      )
  },

  // 📊 Tabs
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.routes').then(
        m => m.routes
      )
  },

  // 🛠️ Admin
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.page').then(
        m => m.AdminPage
      )
  },

  // 💬 Chat
  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat.page').then(
        m => m.ChatPage
      )
  },

  // 🔥 Exercise Details
  {
    path: 'exercise/:id',
    loadComponent: () =>
      import('./exercise/exercise.page').then(
        m => m.ExercisePage
      )
  },

  // 🏃 Running
  {
    path: 'running',
    loadComponent: () =>
      import('./running/running.page').then(
        m => m.RunningPage
      )
  },

  // 💪 Strength
  {
    path: 'strength',
    loadComponent: () =>
      import('./strength/strength.page').then(
        m => m.StrengthPage
      )
  },

  // ❤️ Cardio
  {
    path: 'cardio',
    loadComponent: () =>
      import('./cardio/cardio.page').then(
        m => m.CardioPage
      )
  },

  // 🧘 Yoga
  {
    path: 'yoga',
    loadComponent: () =>
      import('./yoga/yoga.page').then(
        m => m.YogaPage
      )
  },

  // 👤 Profile
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then(
        m => m.ProfilePage
      )
  },

  // 🧠 Fitness Mode
  {
    path: 'fitness-mode',
    loadComponent: () =>
      import('./fitness-mode/fitness-mode.page').then(
        m => m.FitnessModePage
      )
  },

  // 🚨 Fallback
  {
    path: '**',
    redirectTo: 'welcome'
  }

];