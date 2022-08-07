import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEjobComponent } from './add-ejob.component';

describe('CreateJobComponent', () => {
  let component: AddEjobComponent;
  let fixture: ComponentFixture<AddEjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEjobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
