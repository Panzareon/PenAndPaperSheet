import { Injectable } from '@angular/core';
import { Rules } from "./rules";
import { CharacterValue } from './character-value';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  rules : Rules;

  constructor() {
    let storedRules = window.localStorage.getItem("rules");
    if (storedRules) {
      this.rules = JSON.parse(storedRules);
    }
    else {
      this.rules = this.getDefaultRules();
    }
   }

   getDefaultRules(): Rules {
     return {
      values: [{"name":"Age"},{"name":"Description","type":"LongText"}],
      stats:  [
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
      ],
    };
  }

  loadRules(newRules: Rules) {
    this.rules = newRules;
  }

  storeRules() {
    window.localStorage.setItem("rules", JSON.stringify(this.rules));
  }

  getValue(name: string) : CharacterValue {
    return this.rules.values.find(x => x.name == name);
  }
}
