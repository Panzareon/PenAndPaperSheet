import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dice-dialog',
  templateUrl: './edit-dice-dialog.component.html',
  styleUrls: ['./edit-dice-dialog.component.css']
})
export class EditDiceDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit(): void {
  }

  getValue() {
    return JSON.stringify(this.data.skill[this.data.column]);
  }

  setValue(jsonDice : string) {
    this.data.skill[this.data.column] = JSON.parse(jsonDice);
  }
}
