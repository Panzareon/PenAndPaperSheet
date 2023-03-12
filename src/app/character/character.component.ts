import { Component, OnInit } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from "../character.service";
import { RulesService } from '../rules.service';
import { CharacterValue } from '../character-value';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character: Character;

  constructor(private characterService: CharacterService, private rulesService: RulesService) { }

  ngOnInit(): void {
    this.getCharacter();
    this.characterService.characterChanged.subscribe((val) => this.character = val);
  }

  getCharacter(): void {
    this.character = this.characterService.getCharacter();
  }

  getValues(): string[] {
    return this.rulesService.rules.values.map(x => x.name);
  }

  displayType(value: string) {
    return this.rulesService.getValue(value).type ?? "Default";
  }

  characterValue(value: string): CharacterValue {
    return this.rulesService.getValue(value);
  }
}
