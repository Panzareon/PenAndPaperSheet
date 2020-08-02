import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { DiceService } from '../dice.service';
import { CharacterService } from '../character.service';
import { NumberOfDiceType } from '../dice';
import { MessageService } from '../message.service';
import { RulesService } from '../rules.service';
import { SkillList } from '../skill-list';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {
  skillList : SkillList;

  character: Character;
  constructor(private characterService: CharacterService,
     private diceService: DiceService,
     private messageService: MessageService,
     private rulesService: RulesService,
     private route: ActivatedRoute,
     private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.character = this.characterService.getCharacter();
    const skillListName = this.route.snapshot.paramMap.get('skill');
    this.skillList = this.rulesService.rules.skillLists.find(x => x.name == skillListName);
  }

  getName() : string {
    return this.skillList.name;
  }

  rollSkill(skill: [], columnName: string): void {
    this.messageService.add(this.diceService.toText(this.diceService.rollDice(this.character, skill[columnName])));
  }

  getDiceDescription(skill: [], columnName: string) : string {
    return this.diceService.getDiceDescription(skill[columnName], this.character);
  }

  showColumn(columnName: string): boolean {
    return this.skillList.availableColumns.find(x => x.name == columnName) != undefined;
  }
}
