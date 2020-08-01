import { Injectable } from '@angular/core';
import { Character } from './character';
import { StatType } from './stat-type';
import { Skill } from './skill';
import { Dice, NumberOfDiceType } from './dice';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  character: Character = this.createCharacter('Initial Name');

  constructor() { }

  getCharacter(): Character {
    return this.character;
  }

  createCharacter(name: string): Character {
    const character : Character = {
      name: name,
      skills: this.createDefaultSkills(),
      stats: [],
    };
    return character;
  }

  createDefaultSkills(): Skill[] {
    return [
      {name:'Strike', dice: [this.createStatDice(StatType.Enhancer, 6)], damage:[this.createSimpleDice(1, 6), this.createAddStatDice(StatType.Strenth)] , auraUse:0},
      {name:'Block', dice: [this.createStatDice(StatType.Strenth, 10)], auraUse:0},
      {name:'Dodge', dice: [this.createStatDice(StatType.Dexterity, 6)], auraUse:0}
    ]
  }

  createStatDice(statType: StatType, dice: number) : Dice {
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

  createAddStatDice(statType: StatType)
  {
    return {
      type: NumberOfDiceType.AbsoluteStat,
      statType: statType,
    }
  }
}
