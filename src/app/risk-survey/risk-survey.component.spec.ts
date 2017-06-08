import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskSurveyComponent } from './risk-survey.component';

describe('RiskSurveyComponent', () => {
  let component: RiskSurveyComponent;
  let fixture: ComponentFixture<RiskSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
