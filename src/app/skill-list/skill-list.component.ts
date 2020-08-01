import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { Skill } from '../skill';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  @Input() character: Character;
  constructor() { }

  ngOnInit(): void {
  }


  selectSkill(skill: Skill): void {

  }
}
