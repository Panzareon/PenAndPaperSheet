import { Injectable } from '@angular/core';
import { Character } from './character';
import { StatsService } from './stats.service';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  characters: Character[] = this.createCharacter();
  public currentCharacter: number = 0;

  readonly characterChanged = new Subject<Character>();

  constructor(private statsService : StatsService) {  }

  getCharacter(): Character {
    return this.characters[this.currentCharacter];
  }

  loadCharacter(character: Character) : number {
    for (let i = 0; i < this.characters.length; i++)
    {
      if (this.characters[i].name == character.name)
      {
        this.characters[i] = character;
        return i;
      }
    }
    this.characters.push(character);
    return this.characters.length - 1;
  }

  selectCharacter(index: number)
  {
    this.currentCharacter = index;
    this.characterChanged.next(this.getCharacter());
  }

  createCharacter(): Character[] {
    if ("characters" in window.localStorage) {
      try {
        return JSON.parse(window.localStorage.getItem("characters"));
      }
      catch(ex) {
        return Array();
      }
    }
  }

  storeCharacter() {
    window.localStorage.setItem("characters", JSON.stringify(this.characters));
  }
}
