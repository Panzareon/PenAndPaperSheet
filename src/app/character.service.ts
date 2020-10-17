import { Injectable } from '@angular/core';
import { Character } from './character';
import { StatsService } from './stats.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  character: Character = this.createCharacter();

  constructor(private statsService : StatsService) { }

  getCharacter(): Character {
    return this.character;
  }

  loadCharacter(character: Character) {
    this.character = character;
  }

  createCharacter(): Character {
    if ("character" in window.localStorage) {
      return JSON.parse(window.localStorage.getItem("character"));
    }
  }

  storeCharacter() {
    window.localStorage.setItem("character", JSON.stringify(this.getCharacter()));
  }
}
