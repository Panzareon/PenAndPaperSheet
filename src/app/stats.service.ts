import { Injectable } from '@angular/core';
import { StatType } from "./stat-type";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  stats : StatType[] = [    
    { name: "Hp", newGroup: true, newLine: true, label: "Hp:", canUpgrade : false, dependsOn: "MaxHp"},
    { name: "MaxHp", newGroup: false, newLine: false, label: "/", canUpgrade : true, costMultiplier: 0.1, startvalue: 10},
    { name: "Aura", newGroup: false, newLine: true, label: "Aura:", canUpgrade : false, dependsOn: "MaxAura"},
    { name: "MaxAura", newGroup: false, newLine: false, label: "/", canUpgrade : true, costMultiplier: 0.1, startvalue: 10},
    { name: "Strength", newGroup: true, newLine: true, label: "Strength:", canUpgrade : true, costMultiplier: 2},
    { name: "Speed", newGroup: false, newLine: true, label: "Speed:", canUpgrade : true, costMultiplier: 2},
    { name: "Dexterity", newGroup: false, newLine: true, label: "Dexterity:", canUpgrade : true, costMultiplier: 2},
    { name: "Sense", newGroup: false, newLine: true, label: "Sense:", canUpgrade : true, costMultiplier: 2},
    { name: "Nen", newGroup: false, newLine: true, label: "Nen:", canUpgrade : true, costMultiplier: 2},
    { name: "Manipulator", newGroup: true, newLine: true, label: "Manipulator:", canUpgrade : true, costMultiplier: 3},
    { name: "Emitter", newGroup: false, newLine: true, label: "Emitter:", canUpgrade : true, costMultiplier: 3},
    { name: "Enhancer", newGroup: false, newLine: true, label: "Enhancer:", canUpgrade : true, costMultiplier: 3},
    { name: "Transmuter", newGroup: false, newLine: true, label: "Transmuter:", canUpgrade : true, costMultiplier: 3},
    { name: "Conjurer", newGroup: false, newLine: true, label: "Conjurer:", canUpgrade : true, costMultiplier: 3},
    { name: "Specialist", newGroup: false, newLine: true, label: "Specialist:", canUpgrade : true, costMultiplier: 3},
  ]

  constructor() { }

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
}
