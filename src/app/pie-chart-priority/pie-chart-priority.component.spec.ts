import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartPriorityComponent } from './pie-chart-priority.component';

describe('PieChartPriorityComponent', () => {
  let component: PieChartPriorityComponent;
  let fixture: ComponentFixture<PieChartPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieChartPriorityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PieChartPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
