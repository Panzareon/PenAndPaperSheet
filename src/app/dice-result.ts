export interface DiceResult {
    /**
     * The rolled number.
     */
    number: number;

    /**
     * If the result is the maximum number.
     */
    isMax: Boolean;

    /**
     * The number of sides of the dice.
     */
    dice: number;
}