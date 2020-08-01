import { Dice } from "./dice";

export interface Skill {
    name: string,
    dice: Dice[],
    auraUse: number,
    damage?: Dice[],
}