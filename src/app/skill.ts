import { Dice } from "./dice";

export interface Skill {
    name: string,
    description: string,
    dice: Dice[],
    cost: number,
    damage?: Dice[],
    tpSpent: number,
}