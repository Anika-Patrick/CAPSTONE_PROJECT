import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },

  {
    path: 'welcome',
    loadComponent: () =>
      import('./welcome/welcome.page').then(
        m => m.WelcomePage
      )
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(
        m => m.HomePage
      )
  },

  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.page').then(
        m => m.SignupPage
      )
  },

  {
    path: 'bmi',
    loadComponent: () =>
      import('./bmi/bmi.page').then(
        m => m.BmiPage
      )
  },

  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.routes').then(
        m => m.routes
      )
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.page').then(
        m => m.AdminPage
      )
  },

  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat.page').then(
        m => m.ChatPage
      )
  },

  {
    path: 'exercise/:id',
    loadComponent: () =>
      import('./exercise/exercise.page').then(
        m => m.ExercisePage
      )
  },

  {
    path: 'running',
    loadComponent: () =>
      import('./running/running.page').then(
        m => m.RunningPage
      )
  },

  {
    path: 'strength',
    loadComponent: () =>
      import('./strength/strength.page').then(
        m => m.StrengthPage
      )
  },

  {
    path: 'cardio',
    loadComponent: () =>
      import('./cardio/cardio.page').then(
        m => m.CardioPage
      )
  },

  {
    path: 'yoga',
    loadComponent: () =>
      import('./yoga/yoga.page').then(
        m => m.YogaPage
      )
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then(
        m => m.ProfilePage
      )
  },

  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then(
        m => m.SettingsPage
      )
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.page').then(
        m => m.AboutPage
      )
  },

  {
    path: 'fitness-mode',
    loadComponent: () =>
      import('./fitness-mode/fitness-mode.page').then(
        m => m.FitnessModePage
      )
  },

  {
    path: '**',
    redirectTo: 'welcome'
  }

];