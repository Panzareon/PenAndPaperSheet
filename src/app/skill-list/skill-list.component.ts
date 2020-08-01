import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { Skill } from '../skill';
import { DiceService } from '../dice.service';
import { CharacterService } from '../character.service';
import { NumberOfDiceType } from '../dice';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  character: Character;
  constructor(private characterService: CharacterService,
     private diceService: DiceService,
     private messageService: MessageService) { }

  ngOnInit(): void {
    this.character = this.characterService.getCharacter();
  }

  rollSkill(skill: Skill): void {
    this.messageService.add(this.diceService.toText(this.diceService.rollDice(this.character, skill.dice)));
  }

  rollSkillDamage(skill: Skill): void {
    this.messageService.add(this.diceService.toText(this.diceService.rollDice(this.character, skill.damage)));
  }

  getDiceDescription(skill: Skill) : string {
    return this.diceService.getDiceDescription(skill.dice, this.character);
  }

  getDamageDiceDescription(skill: Skill) : string {
    if (skill.damage) {
      return this.diceService.getDiceDescription(skill.damage, this.character);
    }

    return "";
  }
}
