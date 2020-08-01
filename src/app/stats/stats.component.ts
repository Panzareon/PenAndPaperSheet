import { Component, OnInit, Input } from '@angular/core';
import { StatType } from "../stat-type";
import { Character } from '../character';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  character: Character;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter(): void {
    this.character = this.characterService.getCharacter();
  }

  getStats(): StatType[] {
    const a = [];
    for (let item in StatType) {
      if (isNaN(Number(item))) {
        a.push(item);
      }
    }
    return a;
  }
}
