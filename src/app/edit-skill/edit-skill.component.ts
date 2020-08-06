import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillList } from '../skill-list';
import { RulesService } from '../rules.service';
import { Skill } from '../skill';
import { CharacterService } from '../character.service';
import { Dice } from '../dice';
import { DiceService } from '../dice.service';

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
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const skillListName = this.route.snapshot.paramMap.get('skill-list');
    this.skillList = this.rulesService.rules.skillLists.find(x => x.name == skillListName);
    const skill = this.route.snapshot.paramMap.get('skill');
    this.skill = this.characterService.getCharacter().skills[this.skillList.name].find(x => x.id == skill);
  }
  
  editDice(column: string) {

  }

  getDiceDescription(column: string) {
    return this.diceService.getDiceDescription(this.skill[column] as Dice[])
  }
}
