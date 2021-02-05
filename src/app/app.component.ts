import { Component, HostListener } from '@angular/core';
import { CharacterService } from './character.service';
import { RulesService } from './rules.service';
import { NavigationEnd, Router } from '@angular/router';

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

  selectCharacter(name)
  {
    for (let i = 0; i < this.characterService.characters.length; i++)
    {
      if (this.characterService.characters[i].name == name)
      {
        this.characterService.selectCharacter(i);
        this.router.navigate(["/character",i]);
      }
    }
  }
}
