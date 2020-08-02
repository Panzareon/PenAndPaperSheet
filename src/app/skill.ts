import { Dice } from "./dice";

export interface Skill {
    [id:string] : number | string | Dice[]
}