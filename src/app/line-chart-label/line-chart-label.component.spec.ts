import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartLabelComponent } from './line-chart-label.component';

describe('LineChartLabelComponent', () => {
  let component: LineChartLabelComponent;
  let fixture: ComponentFixture<LineChartLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineChartLabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineChartLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
