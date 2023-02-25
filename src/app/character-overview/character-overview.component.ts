import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-overview',
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.css']
})
export class CharacterOverviewComponent implements OnInit {

  constructor(private statsService : StatsService, public characterService : CharacterService) { }

  ngOnInit(): void {
  }

  getStats(): string[] {
    return this.statsService.stats.map(x => x.name);
  }

  getStatValue(stat: string) : number {
    return this.statsService.getStatValue(this.characterService.getCharacter(), stat);
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
