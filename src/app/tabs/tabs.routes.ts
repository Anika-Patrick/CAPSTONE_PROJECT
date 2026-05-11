import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [

      // TAB PAGES
      {
        path: 'tab1',
        loadComponent: () => import('../tab1/tab1.page').then(m => m.Tab1Page)
      },

      // FITNESS MODE PAGE OPENS FIRST
      {
        path: 'tab2',
        loadComponent: () => import('../fitness-mode/fitness-mode.page').then(m => m.FitnessModePage)
      },

      // ORIGINAL TAB2 PAGE = WEIGHTLIFTING
      {
        path: 'weightlifting',
        loadComponent: () => import('../tab2/tab2.page').then(m => m.Tab2Page)
      },

      {
        path: 'tab3',
        loadComponent: () => import('../tab3/tab3.page').then(m => m.Tab3Page)
      },

      {
        path: 'tab4',
        loadComponent: () => import('../tab4/tab4.page').then(m => m.Tab4Page)
      },

      // ❤️ FITNESS CATEGORY PAGES
      {
        path: 'cardio',
        loadComponent: () => import('../cardio/cardio.page').then(m => m.CardioPage)
      },

      {
        path: 'strength',
        loadComponent: () => import('../strength/strength.page').then(m => m.StrengthPage)
      },

      {
        path: 'running',
        loadComponent: () => import('../running/running.page').then(m => m.RunningPage)
      },

      
      // DEFAULT REDIRECT
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  }
];