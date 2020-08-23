import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dice, NumberOfDiceType } from '../dice';
import { RulesService } from '../rules.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-edit-dice-dialog',
  templateUrl: './edit-dice-dialog.component.html',
  styleUrls: ['./edit-dice-dialog.component.css']
})
export class EditDiceDialogComponent implements OnInit {
  columnsToDisplay = ['type', 'number', 'statType', 'dice', 'action']  

  private editDiceArray : Dice[];
  public dataSource : MatTableDataSource<Dice>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private rulesService: RulesService) { }

  ngOnInit(): void {
    this.editDiceArray = this.data.skill[this.data.column];
    this.dataSource = new MatTableDataSource(this.editDiceArray);
  }

  getDiceTypes(): string[] {
    return [
      NumberOfDiceType.Fixed,
      NumberOfDiceType.Stat,
      NumberOfDiceType.AbsoluteStat,
      NumberOfDiceType.Constant
    ]
  }

  getStats(): string[] {
    return this.rulesService.rules.stats.map(x => x.name);
  }

  isReadonly(dice: Dice, column: string) : boolean {
    switch(column) {
      case 'dice':
        return dice.type == NumberOfDiceType.Constant || dice.type == NumberOfDiceType.AbsoluteStat;
      case 'statType':
        return dice.type == NumberOfDiceType.Fixed || dice.type == NumberOfDiceType.Constant;
      case 'number':
        return dice.type == NumberOfDiceType.Stat || dice.type == NumberOfDiceType.AbsoluteStat;
    }
  }

  addDice() {
    this.editDiceArray.push({type:NumberOfDiceType.Fixed});
    this.dataSource._updateChangeSubscription();
  }

  removeDice(dice: Dice) {
    const index = this.editDiceArray.indexOf(dice);
    if (index > -1) {
      this.editDiceArray.splice(index, 1);
    }
    this.dataSource._updateChangeSubscription();
  }
}
