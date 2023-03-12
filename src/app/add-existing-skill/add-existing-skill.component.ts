import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character } from '../character';
import { Dice } from '../dice';
import { DiceService } from '../dice.service';
import { RulesService } from '../rules.service';
import { Skill } from '../skill';
import { SkillList } from '../skill-list';
import { SkillRequirementType } from '../skill-requirement';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-add-existing-skill',
  templateUrl: './add-existing-skill.component.html',
  styleUrls: ['./add-existing-skill.component.css']
})
export class AddExistingSkillComponent implements OnInit {
  skillList : SkillList;
  dataSource : Skill[];
  character: Character;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private rulesService: RulesService,
    private diceService: DiceService,
    private statService: StatsService) { }

  ngOnInit(): void {
    this.skillList = this.data.skillList;
    this.character = this.data.character;
    this.dataSource = this.rulesService.rules.skillLists.find(x => x.name === this.skillList.name).availableSkills.filter(x => this.isAvailable(x));
  }

  getAvailableColumnNames() {
    const columns = this.skillList.availableColumns.map(x => "col" + x.name);
    columns.push("actions");
    return columns;
  }

  getDiceDescription(skill: Skill, columnName: string) : string {
    return this.diceService.getDiceDescription(skill.values[columnName] as Dice[], this.character);
  }

  addSkill(skillId: number)
  {
    let skill = this.skillList.availableSkills.find(x => x.id === skillId);
    let copiedSkill = this.deepCopy(skill);
    let skills = this.character.skills[this.skillList.name];
    copiedSkill.id = skills.map(x => x.id as number).reduce((a, b) => Math.max(a,b)) + 1 ?? 1;
    this.character.skills[this.skillList.name] = skills.concat(copiedSkill);
  }

  private isAvailable(skill : Skill) : boolean {
    if (this.character.skills[this.skillList.name].some(x => x.values.name === skill.values.name)) {
      return false;
    }

    if (skill.requirements === undefined) {
      return true;
    }


    for (let requirement of skill.requirements) {
      switch (requirement.type)
      {
        case SkillRequirementType.Skill:
          if (!this.character.skills[requirement.skillType].some(x => x.values.name === requirement.skillName))
          {
            return false;
          }
          break;
        case SkillRequirementType.Stat:
          const stat = this.statService.getStatValue(this.character, requirement.stat);
          if (stat < requirement.minStatValue)
          {
            return false;
          }
          break;
      }
    }

    return true;
  }

  private deepCopy(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = this.deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }
}
