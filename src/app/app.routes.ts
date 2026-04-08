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
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },

  // 🛠️ Admin
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then(m => m.AdminPage)
  },

  // 📊 Tabs
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes)
  },

  // 💬 Chat (🔥 MUST BE BEFORE **)
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.page').then(m => m.ChatPage)
  },

  // 🚨 Fallback (ALWAYS LAST)
  {
    path: '**',
    redirectTo: 'home'
  }

];