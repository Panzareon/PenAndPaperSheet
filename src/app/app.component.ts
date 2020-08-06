import { Component, HostListener } from '@angular/core';
import { CharacterService } from './character.service';
import { RulesService } from './rules.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HxH Pen and Paper Character';

  constructor(
    private characterService: CharacterService,
    public rulesService: RulesService,
    public router: Router) {
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
    this.characterService.storeCharacter();
    this.rulesService.storeRules();
  }
}
