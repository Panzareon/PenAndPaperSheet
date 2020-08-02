import { Skill } from "./skill";

export interface Character {
    name : string,
    stats : {[id:string] : number},
    skills : Skill[],
    values : {[id:string]: string},
}