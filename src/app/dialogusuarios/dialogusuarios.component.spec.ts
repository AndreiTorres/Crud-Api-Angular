import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogusuariosComponent } from './dialogusuarios.component';

describe('DialogusuariosComponent', () => {
  let component: DialogusuariosComponent;
  let fixture: ComponentFixture<DialogusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogusuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
