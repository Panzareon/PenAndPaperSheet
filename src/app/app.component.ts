import { Component, HostListener } from '@angular/core';
import { CharacterService } from './character.service';
import { RulesService } from './rules.service';
import { Event, NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HxH Pen and Paper Character';

  public character : number;
  public characterName : string;

  constructor(
    public characterService: CharacterService,
    public rulesService: RulesService,
    public router: Router) {
  }

  ngOnInit(): void {
    this.characterService.characterChanged.subscribe((val) =>
    {
      this.character = this.characterService.currentCharacter;
      this.characterName = val.name;
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
    this.characterService.storeCharacter();
    this.rulesService.storeRules();
  }

  selectCharacter(e)
  {
    let index = e.value;
    if (index == -1)
    {
      var character = this.characterService.createNewCharacter(this.rulesService.rules);
      index = this.characterService.characters.indexOf(character);
      var selectCharacterElement = e.source as HTMLSelectElement;
      selectCharacterElement.value = index;
    }

    if (this.characterService.characters[index] != undefined)
    {
      this.characterService.selectCharacter(index);
      this.router.navigate(["/character",index]);
    }
  }
}
