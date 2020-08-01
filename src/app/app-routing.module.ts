import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { StatsComponent } from './stats/stats.component';
import { SkillListComponent } from './skill-list/skill-list.component';

const routes: Routes = [
  {path: 'character', component: CharacterComponent},
  {path: 'stats', component: StatsComponent},
  {path: 'skills', component: SkillListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
