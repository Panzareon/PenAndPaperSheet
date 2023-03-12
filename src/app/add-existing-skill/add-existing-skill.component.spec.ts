import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistingSkillComponent } from './add-existing-skill.component';

describe('AddExistingSkillComponent', () => {
  let component: AddExistingSkillComponent;
  let fixture: ComponentFixture<AddExistingSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExistingSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExistingSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
