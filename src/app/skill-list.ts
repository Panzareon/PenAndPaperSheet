import { DiceModifier } from "./dice-modifier";
import { Skill } from "./skill";

export interface SkillList {
    name: string,
    availableColumns: SkillListColumn[],
    availableSkills: Skill[],
}

export interface SkillListColumn {
    name: string,
    type: string,
    caption: string,
    diceModifier?: DiceModifier[],
    stat?: string,
}