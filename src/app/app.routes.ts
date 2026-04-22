import { Routes } from '@angular/router';

export const routes: Routes = [

  // 🔐 Default → Login
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // 🔐 Login Page
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(
        m => m.HomePage
      )
  },

  // 📏 BMI PAGE (AFTER HOME)
  {
    path: 'bmi',
    loadComponent: () =>
      import('./bmi/bmi.page').then(
        m => m.BmiPage
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

  // 📊 Tabs
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.routes').then(
        m => m.routes
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

  // 🔥 Exercise Route (WITH PARAM)
  {
    path: 'exercise/:id',
    loadComponent: () =>
      import('./exercise/exercise.page').then(
        m => m.ExercisePage
      )
  },

  // 🚨 Fallback (ALWAYS LAST)
  {
    path: '**',
    redirectTo: 'home'
  }

];