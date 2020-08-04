import { DiceModifier } from "./dice-modifier";

export interface SkillList {
    name: string,
    availableColumns: SkillListColumn[],
}

export interface SkillListColumn {
    name: string,
    type: string,
    caption: string,
    diceModifier?: DiceModifier[],
}