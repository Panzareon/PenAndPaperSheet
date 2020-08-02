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
