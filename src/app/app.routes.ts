import { Routes } from '@angular/router';

export const routes: Routes = [

  // DEFAULT
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // HOME
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage)
  },

  // BMI
  {
    path: 'bmi',
    loadComponent: () =>
      import('./bmi/bmi.page').then(m => m.BmiPage)
  },

  // ADMIN
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.page').then(m => m.AdminPage)
  },

  // TABS
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.routes').then(m => m.routes)
  },

  // CHAT
  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat.page').then(m => m.ChatPage)
  },

  // EXERCISE
  {
    path: 'exercise/:id',
    loadComponent: () =>
      import('./exercise/exercise.page').then(m => m.ExercisePage)
  },

  // PROFILE
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then(m => m.ProfilePage)
  },

  // SETTINGS
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then(m => m.SettingsPage)
  },

  // ABOUT
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.page').then(m => m.AboutPage)
  },

  // FITNESS MODE
  {
    path: 'fitness-mode',
    loadComponent: () =>
      import('./fitness-mode/fitness-mode.page').then(m => m.FitnessModePage)
  },

  // FALLBACK MUST BE LAST
  {
    path: '**',
    redirectTo: 'home'
  }

];