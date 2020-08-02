import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { RulesService } from '../rules.service';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent implements OnInit {
  characterJson: string;  
  rulesJson: string;

  constructor(private characterService: CharacterService, private rulesService: RulesService) { }

  ngOnInit(): void {
    this.characterJson = JSON.stringify(this.characterService.getCharacter());
    this.rulesJson = JSON.stringify(this.rulesService.rules);
  }

  loadCharacter(): void {
    this.characterService.loadCharacter(JSON.parse(this.characterJson));
  }

  loadRules(): void {
    this.rulesService.loadRules(JSON.parse(this.rulesJson));
  }
}
