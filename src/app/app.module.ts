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
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CharacterOverviewComponent } from './character-overview/character-overview.component';
import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { EditDiceDialogComponent } from './edit-dice-dialog/edit-dice-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { AddExistingSkillComponent } from './add-existing-skill/add-existing-skill.component';
import { EditRequirementsComponent } from './edit-requirements/edit-requirements.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    SkillListComponent,
    StatsComponent,
    MessageComponent,
    ImportExportComponent,
    ModifyDiceDialogComponent,
    CharacterOverviewComponent,
    EditSkillComponent,
    EditDiceDialogComponent,
    AddExistingSkillComponent,
    EditRequirementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    }],
  bootstrap: [AppComponent],
  entryComponents: [
    ModifyDiceDialogComponent,
    EditDiceDialogComponent,
    AddExistingSkillComponent,
    EditRequirementsComponent,
  ]
})
export class AppModule { }
