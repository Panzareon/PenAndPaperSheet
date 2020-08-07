export class NumberOfDiceType {
    public static readonly Fixed = "Fixed";
    public static readonly Stat = "Stat";
    /**
     * The value of the stat, instead of dice.
     */
    public static readonly AbsoluteStat = "AbsoluteStat";
}

export interface Dice {
    type: string;

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