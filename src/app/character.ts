import { Dice } from './dice';
import { Skill } from './skill';

export interface Character {
    version : number,
    name : string,
    stats : {[id:string] : number},
    skills : {[id:string] : Skill[]},
    values : {[id:string]: string},
}