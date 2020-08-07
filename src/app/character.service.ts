import { Injectable, HostListener } from '@angular/core';
import { Character } from './character';
import { StatType } from './stat-type';
import { Dice, NumberOfDiceType } from './dice';
import { StatsService } from './stats.service';
import { JsonPipe } from '@angular/common';
import { Skill } from './skill';

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
