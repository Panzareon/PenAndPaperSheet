import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillList } from '../skill-list';
import { RulesService } from '../rules.service';
import { Skill } from '../skill';
import { CharacterService } from '../character.service';
import { Dice } from '../dice';
import { DiceService } from '../dice.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDiceDialogComponent } from '../edit-dice-dialog/edit-dice-dialog.component';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  skillList : SkillList;
  skill : Skill;

  constructor(
    private rulesService : RulesService,
    private characterService : CharacterService,
    private diceService: DiceService,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    const skillListName = this.route.snapshot.paramMap.get('skill-list');
    this.skillList = this.rulesService.rules.skillLists.find(x => x.name == skillListName);
    const skill = +this.route.snapshot.paramMap.get('skill');
    if (this.route.snapshot.paramMap.get('char'))
    {
      this.skill = this.characterService.getCharacter().skills[this.skillList.name].find(x => x.id == skill);
    }
    else
    {
      this.skill = this.skillList.availableSkills.find(x => x.id == skill);
    }
  }
  
  editDice(column: string) {
    const dialogRef = this.dialog.open(EditDiceDialogComponent,
      {
        data: {skill: this.skill.values, column: column}
      });
  }

  valueEmpty(column: string) : boolean {
    return this.skill.values[column] === undefined || this.skill[column] === null || this.skill[column] == "";
  }

  getDiceDescription(column: string) {
    return this.diceService.getDiceDescription(this.skill.values[column] as Dice[])
  }
}
