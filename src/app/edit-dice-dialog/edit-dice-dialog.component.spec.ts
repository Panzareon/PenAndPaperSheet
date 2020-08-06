import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiceDialogComponent } from './edit-dice-dialog.component';

describe('EditDiceDialogComponent', () => {
  let component: EditDiceDialogComponent;
  let fixture: ComponentFixture<EditDiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
