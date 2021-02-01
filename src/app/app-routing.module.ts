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
  {path: 'character', component: CharacterComponent, resolve: {rules: RulesResolver }},
  {path: 'character/:character-file', component: CharacterComponent, resolve: { character: CharacterResolver, rules: RulesResolver }},
  {path: 'stats', component: StatsComponent, resolve: {rules: RulesResolver }},
  {path: 'skills/:skill-list', component: SkillListComponent, resolve: {rules: RulesResolver }},
  {path: 'import', component: ImportExportComponent, resolve: {rules: RulesResolver }},
  {path: 'edit-skill/:skill-list/:skill', component: EditSkillComponent, resolve: {rules: RulesResolver }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
