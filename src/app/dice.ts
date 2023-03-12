export enum NumberOfDiceType {
    Fixed = "Fixed",
    Stat = "Stat",
    /**
     * The value of the stat, instead of dice.
     */
    AbsoluteStat = "AbsoluteStat",

    /**
     * A constant number.
     */
    Constant = "Constant",
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
    statType?: string;

    /**
     * The number of sides that the dice have.
     */
    dice?: number;
}