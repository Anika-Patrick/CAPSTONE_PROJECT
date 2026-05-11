import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FitnessService {

  calories: number = 0;

  duration: number = 0;

  bpm: number = 0;

}