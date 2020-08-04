import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDiceDialogComponent } from './modify-dice-dialog.component';

describe('ModifyDiceDialogComponent', () => {
  let component: ModifyDiceDialogComponent;
  let fixture: ComponentFixture<ModifyDiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyDiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
