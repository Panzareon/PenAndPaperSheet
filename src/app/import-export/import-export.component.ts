import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { RulesService } from '../rules.service';
import { MessageService } from '../message.service';
import { Rules } from '../rules';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent implements OnInit {
  characterJson: string;  
  rulesJson: string;

  constructor(
    private characterService: CharacterService,
    private rulesService: RulesService,
    private messagingService: MessageService) { }

  ngOnInit(): void {
    this.characterJson = JSON.stringify(this.characterService.characters);
    this.rulesJson = JSON.stringify(this.rulesService.rules);
  }

  loadCharacter(): void {
    try {
      let character = JSON.parse(this.characterJson);
      if (Array.isArray(character)) {
        this.characterService.characters = Array();
        character.forEach(element => {
          this.characterService.loadCharacter(element);
          this.messagingService.add("Loaded Character");
        });
      }
      else if (character)
      {
        this.characterService.loadCharacter(character);
        this.messagingService.add("Loaded Character");
      }
      else {
        this.messagingService.add("Error loading Character");
      }
    }
    catch {
      this.messagingService.add("Error loading Character");
    }
  }

  loadRules(): void {
    try {
      let rules = JSON.parse(this.rulesJson);
      if (rules && this.validRules(rules)) {
        this.rulesService.loadRules(rules);
        this.messagingService.add("Loaded Rules");
      }
      else {
        this.messagingService.add("Error loading Rules");
      }
    }
    catch {
      this.messagingService.add("Error loading Rules");
    }
  }

  private validRules(rules: Rules) : boolean {
    if (rules.skillLists.find(x => x.availableColumns.find(column => column.name.toLowerCase() == "id") !== undefined) !== undefined) {
      this.messagingService.add("Skill column cannot have name 'id'");
      return false;
    }

    return true;
  }
}
