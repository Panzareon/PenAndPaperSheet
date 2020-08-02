import { Skill } from "./skill";
import { StatType } from './stat-type';

export interface Character {
    stats : any,
    skills : Skill[],
    name : string,
}