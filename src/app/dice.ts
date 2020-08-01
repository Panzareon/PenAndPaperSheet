import { Character } from "./character";
import { DiceResult } from "./dice-result";
import { StatType } from "./stat-type";

export enum NumberOfDiceType {
    Fixed,
    Stat,
    /**
     * The value of the stat, instead of dice.
     */
    AbsoluteStat,
}

export interface Dice {
    type: NumberOfDiceType;

    /**
     * The number of dice, if type is set to Fixed.
     */
    number?: number;

    /**
     * The stat, that the number of dice depends upon, if type is set to Stat.
     */
    statType?: StatType;

    /**
     * The number of sides that the dice have.
     */
    dice?: number;
}