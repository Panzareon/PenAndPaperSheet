import { Dice } from "./dice";

export interface Skill {
    id : number,
    values : {[id:string] : number | string | Dice[]}
}