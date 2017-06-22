import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskSurveyComponent } from './risk-survey.component';
import {DataService} from './data.service';
import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ScoreBarsComponent} from '../shared/score-bars/score-bars.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {MomentModule} from 'angular2-moment';

describe('RiskSurveyComponent', () => {
  let component: RiskSurveyComponent;
  let fixture: ComponentFixture<RiskSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskSurveyComponent, ScoreBarsComponent ],
      imports: [ HttpModule, NgxPaginationModule, NgIdleKeepaliveModule.forRoot(), MomentModule ],
      providers: [ DataService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskSurveyComponent);
    component = fixture.componentInstance;

  });

  it('should create risk-survey component', () => {
    expect(component).toBeTruthy();
  });

  it('should load questions from the server', () => {
    const service = TestBed.get(DataService);
    spyOn(service, 'getQuestions').and.returnValue(Observable.from([[1, 2, 3]]));

    fixture.detectChanges();

    expect(component.questions.length).toBe(3);
  });
});
