import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { StatsComponent } from './stats/stats.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { CharacterResolver } from "./CharacterResolver";
import { RulesResolver } from "./RulesResolver";

const routes: Routes = [
  {path: '', component: CharacterComponent, resolve: { character: CharacterResolver, rules: RulesResolver }},
  {path: 'character/:char', component: CharacterComponent, resolve: { character: CharacterResolver, rules: RulesResolver }},
  {path: 'load/:character-file', component: CharacterComponent, resolve: { character: CharacterResolver, rules: RulesResolver }},
  {path: 'stats/:char', component: StatsComponent, resolve: {character: CharacterResolver, rules: RulesResolver }},
  {path: 'skills/:char/:skill-list', component: SkillListComponent, resolve: {character: CharacterResolver, rules: RulesResolver }},
  {path: 'skills/:skill-list', component: SkillListComponent, resolve: {character: CharacterResolver, rules: RulesResolver }},
  {path: 'import', component: ImportExportComponent, resolve: {character: CharacterResolver, rules: RulesResolver }},
  {path: 'edit-skill/:char/:skill-list/:skill', component: EditSkillComponent, resolve: {character: CharacterResolver, rules: RulesResolver }},
  {path: 'edit-skill/:skill-list/:skill', component: EditSkillComponent, resolve: {character: CharacterResolver, rules: RulesResolver }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
