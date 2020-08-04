import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DiceModifier } from '../dice-modifier';
import { Dice,NumberOfDiceType } from '../dice';
import { Character } from '../character';
import { Constants } from '../constants';

@Component({
  selector: 'app-modify-dice-dialog',
  templateUrl: './modify-dice-dialog.component.html',
  styleUrls: ['./modify-dice-dialog.component.css']
})
export class ModifyDiceDialogComponent implements OnInit {
  public modifier: DiceModifier[];
  public diceArray: Dice[];
  public character: Character; 
  public bonusDice: {modifier: DiceModifier, number: number, dice:number}[];

  constructor(
    private dialogRef: MatDialogRef<ModifyDiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit(): void {
    this.modifier = this.data.diceModifier;
    this.diceArray = this.data.diceArray;
    this.character = this.data.character;
    this.bonusDice = this.data.diceModifier.map(x =>
    {
      return { modifier : x, number : 0, dice : this.getDice(x) ?? this.getDefaultDice(x) };
    });
  }

  showBonusDice(): DiceModifier[] {
    return this.modifier.filter(x => x.type == Constants.bonusDice);
  }

  getDice(modifier: DiceModifier): number {
    return Number.isInteger(modifier.dice) ? Number(modifier.dice) : undefined;
  }

  getDefaultDice(modifier: DiceModifier): number {
    if (!Number.isInteger(modifier.dice) && modifier.dice.toString().startsWith(Constants.defaultPrefix)) {
      return Number(modifier.dice.toString().substr(Constants.defaultPrefix.length))
    }

    return undefined;
  }

  submit(): void {
    for (let modifier of this.bonusDice) {
      this.diceArray.push({type: NumberOfDiceType.Fixed, number: modifier.number, dice: modifier.dice})
    }
    this.dialogRef.close(this.diceArray);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
