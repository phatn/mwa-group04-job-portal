import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEjobsComponent } from './list-ejobs.component';

describe('ListEjobsComponent', () => {
  let component: ListEjobsComponent;
  let fixture: ComponentFixture<ListEjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEjobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
