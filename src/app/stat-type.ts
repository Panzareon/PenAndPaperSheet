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
}

export interface CalculateStep {
  action : string,
  statCost? : {stat?: string, all?: boolean},
  skill? : { skillList : string, value : string, }
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