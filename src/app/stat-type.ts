export interface StatType {
  name : string,
  newGroup : boolean,
  newLine : boolean,
  label : string,
  canUpgrade : boolean,
  costMultiplier? : number,
  startvalue? : number,
  dependsOn? : string,
  calculate? : CalculateStep[],
}

export interface CalculateStep {
  action : string,
  statCost? : {stat?: string, all?: boolean},
  skill? : { skillList : string, value : string, }
}