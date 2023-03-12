export class SkillRequirementType
{
    public static Stat = "Stat";
    public static Skill = "Skill";
}

export interface SkillRequirement
{
    type : string,
    stat?: string,
    minStatValue?: number,
    skillType?: string,
    skillName?: string,
}