import { Injectable } from '@angular/core';
import { StatType, CalculateStep } from "./stat-type";
import { RulesService } from "./rules.service";
import { Character } from './character';
import { CharacterComponent } from './character/character.component';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  stats : StatType[];

  constructor(private rulesService: RulesService) {
    if (this.rulesService.rules) {
      this.loadStats();
    }
    this.rulesService.onRulesChanged(() => this.loadStats())
  }

  getStat(name: string) : StatType {
    return this.stats.find(x => x.name == name);
  }

  getStatValue(character: Character, stat: string) : number{
    return this.getStatValueInternal(character, this.getStat(stat));
  }

  getStatValueInternal(character: Character, stat: StatType) : number{
    if (stat.calculate) {
      let value;
      for (let calc of stat.calculate) {
        switch (calc.action) {
          case "add":
            if (value === undefined) {
              value = 0;
            }
            for (let individual of this.evaluateCalculateStep(character, calc)) {
              value += individual;
            }
            
          break;
        }
      }
      if (value !== undefined) {
        return value;
      }
    }

    return character.stats[stat.name];
  }

  evaluateCalculateStep(character: Character, step : CalculateStep) : number[] {
    const a = [];
    if (step.skill) {
      for (let skill of character.skills[step.skill.skillList]) {
        	a.push(skill[step.skill.value]);
      }
    }
    if (step.statCost) {
      for (let stat of this.stats.filter(x => x.canUpgrade)) {
        a.push(this.getStatCost(stat.name, character.stats[stat.name]));
      }
    }
    return a;
  }

  getStatCost(statName: string, value: number) {
    let stat = this.getStat(statName);
    if (stat.startvalue) {
      return this.getStatCostInternal(stat, Number(value)) - this.getStatCostInternal(stat, stat.startvalue);
    }
    
    return this.getStatCostInternal(stat, Number(value))
  }

  private getStatCostInternal(stat: StatType, value: number) {
    return Math.floor(value * (value  + 1) * stat.costMultiplier/2);
  }

  private loadStats() {
    this.stats = this.rulesService.rules.stats;
  }
}
