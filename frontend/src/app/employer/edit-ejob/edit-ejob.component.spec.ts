import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEjobComponent } from './edit-ejob.component';

describe('EditEjobComponent', () => {
  let component: EditEjobComponent;
  let fixture: ComponentFixture<EditEjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEjobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
