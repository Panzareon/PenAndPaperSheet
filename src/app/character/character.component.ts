import { Component, OnInit } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from "../character.service";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character: Character;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter(): void {
    this.character = this.characterService.getCharacter();
  }
}
