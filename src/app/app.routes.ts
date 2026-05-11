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
  },
  {
    path: 'tab4',
    loadComponent: () => import('./tab4/tab4.page').then( m => m.Tab4Page)
  },
  {
    path: 'cardio',
    loadComponent: () => import('./cardio/cardio.page').then( m => m.CardioPage)
  },
  {
    path: 'strength',
    loadComponent: () => import('./strength/strength.page').then( m => m.StrengthPage)
  },
  
  {
    path: 'running',
    loadComponent: () => import('./running/running.page').then( m => m.RunningPage)
  },
  {
    path: 'cardio',
    loadComponent: () => import('./cardio/cardio.page').then( m => m.CardioPage)
  },
  {
    path: 'strength',
    loadComponent: () => import('./strength/strength.page').then( m => m.StrengthPage)
  },
  
  {
    path: 'running',
    loadComponent: () => import('./running/running.page').then( m => m.RunningPage)
  },
  {
    path: 'tab5',
    loadComponent: () => import('./tab5/tab5.page').then( m => m.Tab5Page)
  },
  {
    path: 'tab5',
    loadComponent: () => import('./tab5/tab5.page').then( m => m.Tab5Page)
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'fitness-mode',
    loadComponent: () => import('./fitness-mode/fitness-mode.page').then( m => m.FitnessModePage)
  },
 


];