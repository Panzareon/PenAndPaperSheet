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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { ModifyDiceDialogComponent } from './modify-dice-dialog/modify-dice-dialog.component'
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    SkillListComponent,
    StatsComponent,
    MessageComponent,
    ImportExportComponent,
    ModifyDiceDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModifyDiceDialogComponent,
  ]
})
export class AppModule { }
