import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { StatsComponent } from './stats/stats.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { CharacterResolver } from "./CharacterResolver";

const routes: Routes = [
  {path: 'character', component: CharacterComponent},
  {path: 'character/:character-file', component: CharacterComponent, resolve: { character: CharacterResolver }},
  {path: 'stats', component: StatsComponent},
  {path: 'skills/:skill-list', component: SkillListComponent},
  {path: 'import', component: ImportExportComponent},
  {path: 'edit-skill/:skill-list/:skill', component: EditSkillComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
