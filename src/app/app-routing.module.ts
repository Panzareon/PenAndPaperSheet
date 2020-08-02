import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { StatsComponent } from './stats/stats.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { ImportExportComponent } from './import-export/import-export.component';

const routes: Routes = [
  {path: 'character', component: CharacterComponent},
  {path: 'stats', component: StatsComponent},
  {path: 'skills/:skill', component: SkillListComponent},
  {path: 'import', component: ImportExportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
