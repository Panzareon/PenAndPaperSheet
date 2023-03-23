import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RulesService } from '../rules.service';
import { Skill } from '../skill';
import { SkillRequirement, SkillRequirementType } from '../skill-requirement';

@Component({
  selector: 'app-edit-requirements',
  templateUrl: './edit-requirements.component.html',
  styleUrls: ['./edit-requirements.component.css']
})
export class EditRequirementsComponent implements OnInit {
  skill: Skill;
  dataSource: MatTableDataSource<SkillRequirement>;
  constructor(@Inject(MAT_DIALOG_DATA) private data,
    private rulesService: RulesService) { }

  ngOnInit(): void {
    this.skill = this.data.skill;
    if (this.skill.requirements === undefined)
    {
      this.skill.requirements = [];
    }
    this.dataSource = new MatTableDataSource(this.skill.requirements);
  }

  getAvailableColumnNames(): string[] {
    return ["type", "stat", "minStatValue","skillType","skillName","action"];
  }

  addRow() : void {
    this.skill.requirements.push({type: SkillRequirementType.Stat});
    this.dataSource._updateChangeSubscription();
  }

  removeRow(row: SkillRequirement)  {
    this.dataSource.data.splice(this.dataSource.data.indexOf(row), 1);
    this.dataSource._updateChangeSubscription();
  }

  getSkillList(row: SkillRequirement)  {
    return this.rulesService.rules.skillLists.find(x => x.name === row.skillType).availableSkills.filter(x => x.values.name !== this.skill.values.name);
  }

  isStatRequirement(row: SkillRequirement)  {
    return row.type == SkillRequirementType.Stat;
  }

  isSkillRequirement(row: SkillRequirement)  {
    return row.type == SkillRequirementType.Skill;
  }
}
