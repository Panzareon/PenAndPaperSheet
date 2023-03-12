import { Dice } from "./dice";

export interface Skill {
    id : number,
    [id:string] : number | string | Dice[]
}