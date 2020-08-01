export interface StatType {
  name : string,
  newGroup : boolean,
  newLine : boolean,
  label : string,
  canUpgrade : boolean,
  costMultiplier? : number,
  startvalue? : number,
  dependsOn? : string,
}