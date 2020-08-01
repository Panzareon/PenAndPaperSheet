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
    for (let item in StatType) {
      if (isNaN(Number(item))) {
        character.stats[item] = 0;
      }
    }
    return character;
  }

  createDefaultSkills(): Skill[] {
    return [
      {name:'Strike', description:'A simple hit enforced with Nen', dice: [this.createStatDice(StatType.Enhancer, 6)], damage:[this.createSimpleDice(1, 6), this.createAddStatDice(StatType.Strenth)] , auraUse:0, tpSpent:0},
      {name:'Block', description:'Defense: if successful get half the damage', dice: [this.createStatDice(StatType.Strenth, 10)], auraUse:0, tpSpent:0},
      {name:'Dodge', description:'Defense: if successful get no damage', dice: [this.createStatDice(StatType.Dexterity, 6)], auraUse:0, tpSpent:0}
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
