import { Injectable } from '@angular/core';
import { Character } from './character';
import { Dice, NumberOfDiceType } from "./dice";
import { DiceResult } from './dice-result';
import { DiceModifier } from './dice-modifier';
import { MatDialog } from "@angular/material/dialog";
import { ModifyDiceDialogComponent } from './modify-dice-dialog/modify-dice-dialog.component';
import { Constants } from "./constants";

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor(private dialog: MatDialog) { }

  rollDice(character: Character, diceArray: Dice[], diceModifier: DiceModifier[], callbackFunction: { (result: DiceResult[]): void; }): void{
    if (diceModifier && diceModifier.find(x => x.type == Constants.bonusDice)) {
      const dialogRef = this.dialog.open(ModifyDiceDialogComponent,
      {
        data: {character: character, diceArray: diceArray.slice(), diceModifier: diceModifier}
      });

      dialogRef.afterClosed().subscribe(result =>
      {
        if (!result) {
          return;
        }

        diceModifier = diceModifier.filter(x => x.type != Constants.bonusDice);
        this.rollDice(character, result, diceModifier, callbackFunction);
      })
    }
    else {
      const a: DiceResult[] = [];
      for (let dice of diceArray)
      {
        for (let i = 0; i < this.getNumberOfDice(character, dice); i++) {
            var result = Math.floor(Math.random() * dice.dice) + 1;
            a.push({number: result, isMax: result == dice.dice, dice: dice.dice});
        }
  
        if (dice.type == NumberOfDiceType.AbsoluteStat)
        {
          a.push({number:Number(character.stats[dice.statType]), isMax: false, dice: 0})
        }
      }
      
      callbackFunction(a);
    }
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
    if (!diceList) {
      return "";
    }

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
