import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { Skill } from '../skill';
import { DiceService } from '../dice.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  @Input() character: Character;
  constructor(private diceService: DiceService) { }

  ngOnInit(): void {
  }


  selectSkill(skill: Skill): void {
    console.log(this.diceService.rollDiceOfSkill(this.character, skill));
  }
}
