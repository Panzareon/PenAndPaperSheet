import { Injectable } from '@angular/core';
import { Character } from './character';
import { Skill } from './skill';
import { Dice, NumberOfDiceType } from "./dice";
import { DiceResult } from './dice-result';
import { StatType } from './stat-type';

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
          a.push({number: result, isMax: result == dice.dice, dice: dice.dice});
      }

      if (dice.type == NumberOfDiceType.AbsoluteStat)
      {
        a.push({number:character.stats[dice.statType], isMax: false, dice: 0})
      }
    }
    return a;
  }

  toText(result: DiceResult[]) {
    let text = "";
    let sum = 0;
    for (let diceResult of result) {
      sum = sum + diceResult.number;
      if (text) {
        text = text + " + ";
      }

      if (diceResult.isMax) {
        text = text + "<span class=\"max-dice\">" + diceResult.number + "</span>";
      }
      else {
        text = text + diceResult.number;
      }
    }

    if (text) {
      text = text + " = ";
    }

    return text + sum;
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

  getDiceDescription(diceList: Dice[], character?: Character) {
    let text = "";
    for (let dice of diceList)
    {
      if (text) {
        text = text + " + ";
      }
      switch (dice.type) {
        case NumberOfDiceType.AbsoluteStat:
          text = text + this.getStatDescription(dice.statType, character);
          break;
        case NumberOfDiceType.Fixed:
          text = text + dice.number + "D" + dice.dice;
          break;
        case NumberOfDiceType.Stat:
          text = text + this.getStatDescription(dice.statType, character) + "D" + dice.dice;
          break;
      }
    }
    return text;
  }

  getStatDescription(stat: string, character?: Character) {
    if (character) {
      return "(" + stat + ":" + character.stats[stat] + ")";
    }

    return "(" + stat + ")";
  }
}
