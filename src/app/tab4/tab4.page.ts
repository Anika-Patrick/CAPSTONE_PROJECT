import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MusicService } from '../services/music.service';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab4Page {

  songs: any[] = [];

  constructor(private musicService: MusicService) {
    this.loadSongs();
  }

  loadSongs() {
    this.musicService.getSongs().subscribe({
      next: (data: any) => {
        this.songs = data;
      },

      error: (err) => {
        console.log('API Error:', err);
      }
    });
  }

}