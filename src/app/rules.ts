import { StatType } from "./stat-type";
import { CharacterValue } from "./character-value";
import { SkillList } from "./skill-list";

export interface Rules {
    values : CharacterValue[],
    stats : StatType[],
    skillLists : SkillList[],
}