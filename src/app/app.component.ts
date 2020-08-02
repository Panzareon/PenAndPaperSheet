import { Component, HostListener } from '@angular/core';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HxH Pen and Paper Character';

  constructor(private characterService: CharacterService) {
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
    this.characterService.storeCharacter();
  }
}
