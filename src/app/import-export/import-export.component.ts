import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent implements OnInit {
  characterJson: string;  

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.characterJson = JSON.stringify(this.characterService.getCharacter());
  }

  loadCharacter(): void {
    this.characterService.loadCharacter(JSON.parse(this.characterJson));
  }
}
