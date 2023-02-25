import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';
import { CharacterService } from '../character.service';
import { Character } from '../character';

@Component({
  selector: 'app-character-overview',
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.css']
})
export class CharacterOverviewComponent implements OnInit {
  character: Character;

  constructor(private statsService : StatsService, public characterService : CharacterService) { }

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter(): void {
    this.character = this.characterService.getCharacter();
  }

  getStats(): string[] {
    return this.statsService.stats.map(x => x.name);
  }

  getStatValue(stat: string) : number {
    return this.statsService.getStatValue(this.characterService.getCharacter(), stat);
  }

  canEdit(statName: string) : boolean {
    var stat = this.statsService.getStat(statName);
    if (!stat.dependsOn)
    {
      return false;
    }

    return stat.calculate === undefined;
  }

  getLabel(stat: string): string {
    if (this.statsService.previousStatDependsOnStat(stat))
    {
      return "/";
    }

    return this.statsService.getStat(stat).label;
  }

  addNewline(stat: string) : boolean {
    return !this.statsService.previousStatDependsOnStat(stat);
  }

  newGroup(stat: string) : boolean {
    return this.statsService.getStat(stat).newGroup;
  }
}
