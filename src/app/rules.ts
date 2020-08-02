import { StatType } from "./stat-type";
import { CharacterValue } from "./character-value";

export interface Rules {
    values : CharacterValue[],
    stats : StatType[],
}