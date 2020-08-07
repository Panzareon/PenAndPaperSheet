export interface StatType {
  name : string,
  newGroup : boolean,
  newLine : boolean,
  label : string,
  canUpgrade : boolean,
  costMultiplier? : number | Calculation,
  startvalue? : number,
  dependsOn? : string,
  calculate? : CalculateStep[],
  add? : CalculateStep[],
}

export interface CalculateStep {
  action : string,
  statCost? : {stat?: string, all?: boolean},
  skill? : { skillList : string, value : string, }
  statBase? : string,
  constant? : number,
  condition? : Calculation,
}

export interface Calculation {
  check: Compare,
  // The value if the check is true
  true: number,
  // The value if the check is false
  false: number,
}

export interface Compare {
  compareValue: string,
  compareWith: string,
}

export class CalculateConstants {
  public static readonly add = "add";
  public static readonly multiply = "multiply";
  public static readonly floor = "floor";
  public static readonly ceil = "ceil";
  public static readonly round = "round";
}