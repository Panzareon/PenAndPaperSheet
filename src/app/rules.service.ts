import { Injectable } from '@angular/core';
import { Rules } from "./rules";
import { CharacterValue } from './character-value';
import defaultRules from '../assets/rules/hxh.json';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  rules : Rules;

  rulesChanged : CallableFunction[] = [];

  constructor() {
    if ("rules" in window.localStorage) {
      this.rules = JSON.parse(window.localStorage.getItem("rules"));
    }
    else {
      this.rules = defaultRules;
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
