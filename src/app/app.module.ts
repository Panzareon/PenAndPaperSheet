import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterComponent } from './character/character.component';
import { FormsModule } from "@angular/forms";
import { SkillListComponent } from './skill-list/skill-list.component';
import { StatsComponent } from './stats/stats.component';
import { MessageComponent } from './message/message.component';
import { ImportExportComponent } from './import-export/import-export.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    SkillListComponent,
    StatsComponent,
    MessageComponent,
    ImportExportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
