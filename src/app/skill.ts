import { Dice } from "./dice";
import { SkillRequirement } from "./skill-requirement";

export interface Skill {
    id : number,
    requirements? : SkillRequirement[],
    values : {
        name : string,
        [id:string] : number | string | Dice[]
    }
}