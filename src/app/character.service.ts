import { Injectable } from '@angular/core';
import { Character } from './character';
import { StatsService } from './stats.service';
import { Subject } from "rxjs";
import { Rules } from './rules';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public currentVersion: number = 1;
  characters: Character[] = this.createCharacter();
  public currentCharacter: number = 0;

  readonly characterChanged = new Subject<Character>();

  constructor(private statsService : StatsService) {  }

  getCharacter(): Character {
    return this.characters[this.currentCharacter];
  }

  loadCharacter(character: Character) : number {
    this.migrateCharacterIfNecessary(character);
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

  createNewCharacter(rules : Rules) : Character {
    var character : Character = {
      version: this.currentVersion,
      name:'',
      stats: {},
      skills: {},
      values: {},
    }
    rules.skillLists.forEach(x =>{
      character.skills[x.name] = [];
    });
    rules.values.forEach(x => {
      character.values[x.name] = x.values?.length > 0 ? x.values[0] : "";
    })
    rules.stats.forEach(x => {
      character.stats[x.name] = x.startvalue ?? 0;
    })
    this.characters.push(character);
    return character;
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

  private migrateCharacterIfNecessary(character: Character) {
    if (character.version === undefined)
    {
      character.version = this.currentVersion;
      for (let skillType in character.skills)
      {
        for (let skill of character.skills[skillType])
        {
          skill.values = {name:null};
          for (let column in skill)
          {
            if (column != "id" && column != "values")
            {
              skill.values[column] = skill[column];
              skill[column] = undefined;
            }
          }
        }
      }
    }
  }
}
