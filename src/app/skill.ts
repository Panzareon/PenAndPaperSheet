import { Dice } from "./dice";

export interface Skill {
    name: string,
    description: string,
    dice: Dice[],
    auraUse: number,
    damage?: Dice[],
    tpSpent: number,
}