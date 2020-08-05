import { Injectable } from '@angular/core';
import { Rules } from "./rules";
import { CharacterValue } from './character-value';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  rules : Rules;

  rulesChanged : CallableFunction[] = [];

  constructor() {
    let storedRules = window.localStorage.getItem("rules");
    if (storedRules !== "undefined") {
      this.rules = JSON.parse(storedRules);
    }
  }

  loadRules(newRules: Rules) {
    this.rules = newRules;
    this.notifyRulesChanged();
  }

  storeRules() {
    window.localStorage.setItem("rules", JSON.stringify(this.rules));
  }

  getValue(name: string) : CharacterValue {
    if (this.rules) {
      return this.rules.values.find(x => x.name == name);
    }
  }
  
  onRulesChanged(callableFunction: CallableFunction) {
    this.rulesChanged.push(callableFunction);
  }

  notifyRulesChanged() {
    for (let callableFunction of this.rulesChanged) {
      callableFunction();
    }
  }
}
