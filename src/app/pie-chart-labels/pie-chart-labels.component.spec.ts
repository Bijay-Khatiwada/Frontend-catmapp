import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartLabelsComponent } from './pie-chart-labels.component';

describe('PieChartLabelComponent', () => {
  let component: PieChartLabelsComponent;
  let fixture: ComponentFixture<PieChartLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieChartLabelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PieChartLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
