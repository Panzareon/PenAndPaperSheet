import { Injectable } from '@angular/core';
import { StatType } from "./stat-type";
import { RulesService } from "./rules.service";

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

  getStatCost(statName: string, value: number) {
    let stat = this.getStat(statName);
    if (stat.startvalue) {
      return this.getStatCostInternal(stat, value) - this.getStatCostInternal(stat, stat.startvalue);
    }
    
    return this.getStatCostInternal(stat, value)
  }

  private getStatCostInternal(stat: StatType, value: number) {
    return Math.floor(value * (value  + 1) * stat.costMultiplier/2);
  }

  private loadStats() {
    this.stats = this.rulesService.rules.stats;
  }
}
