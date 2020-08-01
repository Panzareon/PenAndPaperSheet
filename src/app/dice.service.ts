import { Injectable } from '@angular/core';
import { Character } from './character';
import { Skill } from './skill';
import { Dice, NumberOfDiceType } from "./dice";
import { DiceResult } from './dice-result';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() { }

  rollDiceOfSkill(character: Character, skill: Skill): DiceResult[]{
    return this.rollDice(character, skill.dice);
  }
    
  rollDice(character: Character, diceArray: Dice[]): DiceResult[]{
    const a: DiceResult[] = [];
    for (let dice of diceArray)
    {
      for (let i = 0; i < this.getNumberOfDice(character, dice); i++) {
          var result = Math.floor(Math.random() * dice.dice) + 1;
          a.push({number: result, isMax: result == dice.dice});
      }
    }
    return a;
  }

  getNumberOfDice(character: Character, dice: Dice) {
    switch(dice.type) {
      case NumberOfDiceType.Fixed:
        return dice.number;
      case NumberOfDiceType.Stat:
        return character.stats[dice.statType];
      case NumberOfDiceType.AbsoluteStat:
        return 0;
    }
  }
}
