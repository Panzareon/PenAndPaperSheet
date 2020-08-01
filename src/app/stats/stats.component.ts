import { Component, OnInit, Input } from '@angular/core';
import { StatType } from "../stat-type";
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  character: Character;

  constructor(private characterService: CharacterService, private statsService: StatsService) { }

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter(): void {
    this.character = this.characterService.getCharacter();
  }

  getStats(): string[] {
    return this.statsService.stats.map(x => x.name);
  }

  getLabel(stat: string): string {
    return this.statsService.getStat(stat).label;
  }

  addNewline(stat: string) : boolean {
    return this.statsService.getStat(stat).newLine;
  }

  newGroup(stat: string) : boolean {
    return this.statsService.getStat(stat).newGroup;
  }

  canUpgrade(stat: string) : boolean {
    return this.statsService.getStat(stat).canUpgrade;
  }

  upgradeStat(stat: string) {
    if (this.canUpgrade(stat))
    {
      this.character.stats[stat]++;
    }
  }

  statCost(stat: string) {
    return this.statsService.getStatCost(stat, Number(this.character.stats[stat]));
  }
}
