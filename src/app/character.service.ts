import { Injectable, HostListener } from '@angular/core';
import { Character } from './character';
import { StatType } from './stat-type';
import { Skill } from './skill';
import { Dice, NumberOfDiceType } from './dice';
import { StatsService } from './stats.service';
import { JsonPipe } from '@angular/common';

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
    let storedCharacter = window.localStorage.getItem("character");
    if (storedCharacter) {
      return JSON.parse(storedCharacter);
    }

    const character : Character = {
      name: "",
      skills: this.createDefaultSkills(),
      stats: {},
    };
    for (let item of this.statsService.stats) {
      character.stats[item.name] = (item.dependsOn ? this.statsService.getStat(item.dependsOn).startvalue : item.startvalue) ?? 0;
    }
    return character;
  }

  storeCharacter() {
    window.localStorage.setItem("character", JSON.stringify(this.getCharacter()));
  }

  createDefaultSkills(): Skill[] {
    return [
      {name:'Strike', description:'A simple hit enforced with Nen', dice: [this.createStatDice("Enhancer", 6)], damage:[this.createSimpleDice(1, 6), this.createAddStatDice("Strength")] , cost:0, tpSpent:0},
      {name:'Block', description:'Defense: if successful get half the damage', dice: [this.createStatDice("Strength", 10)], cost:0, tpSpent:0},
      {name:'Dodge', description:'Defense: if successful get no damage', dice: [this.createStatDice("Dexterity", 6)], cost:0, tpSpent:0}
    ]
  }

  createStatDice(statType: string, dice: number) : Dice {
    return {
      type: NumberOfDiceType.Stat,
      statType: statType,
      dice: dice,
    };
  }

  createSimpleDice(number: number, dice: number) : Dice {
    return {
      type: NumberOfDiceType.Fixed,
      number: number,
      dice: dice,
    }
  }

  createAddStatDice(statType: string)
  {
    return {
      type: NumberOfDiceType.AbsoluteStat,
      statType: statType,
    }
  }
}
