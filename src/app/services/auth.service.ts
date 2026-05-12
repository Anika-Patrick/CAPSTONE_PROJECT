import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'fitness_users';

  private normalize(username: string): string {
    return username?.trim().toLowerCase() || '';
  }

  getUsers(): any[] {
    const raw = localStorage.getItem(this.storageKey) || '[]';
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      localStorage.setItem(this.storageKey, '[]');
      return [];
    }
  }

  saveUsers(users: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  userExists(username: string): boolean {
    const lookup = this.normalize(username);
    return this.getUsers().some(
      u => this.normalize(u.username) === lookup
    );
  }

  findUser(username: string, password: string): any {
    const lookup = this.normalize(username);
    return this.getUsers().find(
      u => this.normalize(u.username) === lookup && u.password === password
    );
  }

  register(username: string, password: string): any {
    const normalizedUsername = username.trim();
    const users = this.getUsers();

    const exists = users.some(
      u => this.normalize(u.username) === this.normalize(normalizedUsername)
    );

    if (exists) {
      return null;
    }

    const newUser = {
      username: normalizedUsername,
      password: password.trim(),
      caloriesBurned: 0,
      tokens: 0,
      streak: 0,
      totalWorkouts: 0,
      lastLoginDate: '',
      rank: '',
      weeklyCalories: [0, 0, 0, 0, 0, 0, 0]
    };

    users.push(newUser);
    this.saveUsers(users);

    return newUser;
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('current_user', JSON.stringify(user));
    localStorage.setItem('current_profile', JSON.stringify({
      username: user.username,
      loginTime: new Date().toISOString()
    }));
  }
}
