import { Injectable } from '@angular/core';
import { StatType, CalculateStep, Calculation, Compare, CalculateConstants } from "./stat-type";
import { RulesService } from "./rules.service";
import { Character } from './character';
import { CharacterComponent } from './character/character.component';
import { CharacterValue } from './character-value';

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
    return this.getStatValueWithModifiertInternal(character, this.getStat(stat));
  }

  private getStatValueWithModifiertInternal(character: Character, stat: StatType) : number{
    let value = this.getStatValueInternal(character, stat);
    if (stat.add) {
      value = this.evaluateCalculateArray(character, stat.add, CalculateConstants.add, value);
    }

    switch (this.rulesService.rules.properties.roundStats) {
      case CalculateConstants.floor:
        value = Math.floor(value);
      break
      case CalculateConstants.ceil:
        value = Math.ceil(value);
      break
      case CalculateConstants.round:
        value = Math.round(value);
      break
    }

    return value;
  }

  private getStatValueInternal(character: Character, stat: StatType) : number{
    if (stat.calculate) {
      return this.evaluateCalculateArray(character, stat.calculate, CalculateConstants.add);
    }

    return character.stats[stat.name];
  }

  private evaluateCalculateArray(character: Character, steps : CalculateStep[], combineType : string, value? : number) : number {
    for (let calc of steps) {
      let currentValue = 0;
      switch (calc.action) {
        case CalculateConstants.add:
          for (let individual of this.evaluateCalculateStep(character, calc)) {
            currentValue += individual;
          }

        break;
        case CalculateConstants.multiply:
          currentValue = 1;
          for (let individual of this.evaluateCalculateStep(character, calc)) {
            currentValue *= individual;
          }

        break;
      }

      if (value === undefined) {
        value = currentValue;
      }
      else {
        switch (combineType) {
          case CalculateConstants.add:
            value += currentValue;
          break;
          case CalculateConstants.multiply:
            value *= currentValue;
          break;
        }
      }
    }
    if (value !== undefined) {
      return value;
    }
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
        a.push(this.getStatCost(stat.name, character.stats[stat.name], character));
      }
    }
    if (step.statBase) {
      a.push(character.stats[step.statBase]);
    }
    if (step.constant !== undefined && step.constant !== null) {
      a.push(step.constant);
    }
    if (step.condition) {
      a.push(this.evaluate(step.condition.check, character) ? step.condition.true : step.condition.false);
    }
    return a;
  }

  getStatCost(statName: string, value: number, character: Character) {
    let stat = this.getStat(statName);
    if (stat.startvalue) {
      return this.getStatCostInternal(stat, Number(value), character) - this.getStatCostInternal(stat, stat.startvalue, character);
    }
    
    return this.getStatCostInternal(stat, Number(value), character)
  }

  private getStatCostInternal(stat: StatType, value: number, character: Character) : number {
    return Math.floor(value * (value  + 1) * this.getStatConstMultiplier(stat.costMultiplier, character)/2);
  }

  private getStatConstMultiplier(costMultiplier: number | Calculation, character: Character) : number {
    if (typeof costMultiplier != "number") {
      return this.evaluate(costMultiplier.check, character) ? costMultiplier.true : costMultiplier.false;
    }

    return costMultiplier as number;
  }

  private loadStats() {
    this.stats = this.rulesService.rules.stats;
  }

  private evaluate(check: Compare, character: Character) : boolean {
    return character.values[check.compareValue] == check.compareWith;
  }
}
