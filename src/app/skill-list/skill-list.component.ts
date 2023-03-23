import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { DiceService } from '../dice.service';
import { CharacterService } from '../character.service';
import { NumberOfDiceType, Dice } from '../dice';
import { MessageService } from '../message.service';
import { RulesService } from '../rules.service';
import { SkillList, SkillListColumn } from '../skill-list';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from "../skill";
import { AddExistingSkillComponent } from '../add-existing-skill/add-existing-skill.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {
  skillList : SkillList;
  characterIndex? : number;
  character?: Character;
  dataSource: MatTableDataSource<Skill>;
  constructor(private characterService: CharacterService,
     private diceService: DiceService,
     private messageService: MessageService,
     private rulesService: RulesService,
     private route: ActivatedRoute,
     private router: Router,
     private dialog: MatDialog) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('char'))
    {
      this.character = this.characterService.getCharacter();
      this.characterIndex = this.characterService.currentCharacter;
    }
    const skillListName = this.route.snapshot.paramMap.get('skill-list');
    this.skillList = this.rulesService.rules.skillLists.find(x => x.name == skillListName);
    this.dataSource = new MatTableDataSource(this.getSkills());
  }

  getName() : string {
    return this.skillList.name;
  }

  rollSkill(skill: Skill, column: SkillListColumn): void {
    let dice = skill.values[column.name] as Dice[];
    this.diceService.rollDice(this.character,dice , column.diceModifier, diceResult =>
      {
        this.messageService.add(this.diceService.toText(diceResult));
      })
  }

  statCost(skill: Skill, column: SkillListColumn): void {
    let cost = skill.values[column.name] as number;
    this.character.stats[column.stat] -= cost;
  }

  getDiceDescription(skill: Skill, columnName: string) : string {
    return this.diceService.getDiceDescription(skill.values[columnName] as Dice[], this.character);
  }

  showColumn(columnName: string): boolean {
    return this.skillList.availableColumns.find(x => x.name == columnName) != undefined;
  }

  getAvailableColumnNames() {
    const columns = this.skillList.availableColumns.map(x => "col" + x.name);
    columns.push("actions");
    return columns;
  }

  addSkill() {
    const dialogRef = this.dialog.open(AddExistingSkillComponent,
      {
        data: {skillList: this.skillList, character: this.character, parentDataSource: this.dataSource }
      });
  }
  addNewSkill() {
    const skills = this.getSkills();
    const id = skills.length === 0 ? 1 : skills.map(x => x.id as number).reduce((a, b) => Math.max(a,b)) + 1;
    const skill = {
      "id": id,
      "values": {
        name : "",
      }
    }
    this.getSkills().push(skill);
    if (this.character === undefined)
    {
      this.router.navigate(["edit-skill/" + this.getName() + "/" + skill.id])
    }
    else
    {
      this.router.navigate(["edit-skill/" + this.characterIndex + "/" + this.getName() + "/" + skill.id])
    }
  }

  deleteSkill(skillId : number) {
    const index = this.dataSource.data.indexOf(this.dataSource.data.find(e => e.id === skillId));
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  getSkills() : Skill[] {
    if (this.character === undefined)
    {
      return this.skillList.availableSkills;
    }

    return this.character.skills[this.getName()];
  }
}
